const express = require('express');
var morgan = require('morgan');
const WebSocket = require('ws');

const generateJobs = require('./utils/jobPulgin');
const { errorHandler } = require('./utils');
const bodyParser = require("body-parser");
const routes = require("./controllers/index");

const app = express();

// 创建WebSocket服务器
// const server = require('http').createServer(app);
// const wss = new WebSocket.Server({ server });

var expressWs = require('express-ws')(app);

app.use(morgan('short'));
app.use(express.json());
app.use(bodyParser.json());


// 用于存储频道相关的WebSocket客户端
const clientsByChannel = {};

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     try {
//       const data = JSON.parse(message);
//       if (data.type === 'subscribe' && data.channel) {
//         if (!clientsByChannel[data.channel]) {
//           clientsByChannel[data.channel] = new Set();
//         }
//         clientsByChannel[data.channel].add(ws);
//         console.log(`Client subscribed to channel: ${data.channel}`);
//       }
//     } catch (error) {
//       console.error('Error parsing message:', error);
//     }
//   });

//   ws.on('close', () => {
//     for (const channel in clientsByChannel) {
//       clientsByChannel[channel].delete(ws);
//     }
//   });
// });

app.ws('/', function(ws, req) {
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'subscribe' && data.channel) {
        if (!clientsByChannel[data.channel]) {
          clientsByChannel[data.channel] = new Set();
        }
        clientsByChannel[data.channel].add(ws);
        console.log(`Client subscribed to channel: ${data.channel}`);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    for (const channel in clientsByChannel) {
      clientsByChannel[channel].delete(ws);
    }
  });

});

function pushDataToChannel(channel, data) {
  if (clientsByChannel[channel]) {
    clientsByChannel[channel].forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}

generateJobs(pushDataToChannel);

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

