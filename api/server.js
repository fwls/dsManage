const express = require('express');
const WebSocket = require('ws');
const schedule = require('node-schedule');
const app = express();

const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// 用于存储频道相关的WebSocket客户端
const clientsByChannel = {};

wss.on('connection', (ws) => {
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

// 使用node-schedule安排定时任务，每分钟执行一次
const job = schedule.scheduleJob('*/1 * * * *', function() {
  console.log('Pushing data to channel1');
  pushDataToChannel('channel1', { message: 'Hello from channel1', timestamp: new Date() });
});

// Express路由配置（可选）
app.get('/', (req, res) => {
  res.send('WebSocket Server Running');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});