const knex = require("../config/db");
const schedule = require('node-schedule');
const executeHelper = require("./executeHelper");

const dataSetJobs = {}

const generateJobs = async (pushDataToChannel, WebSocket) => {
    const datasets = await knex.table('data_channel_data_sets as a')
        .leftJoin('data_sets as b', 'b.id', 'a.data_set_id')
        .leftJoin('data_sources as c', 'c.id', 'b.data_source_id')
        .where('a.push_type', 'websocket')
        .select('a.data_channel_id', 'a.data_set_id',
            'a.push_cron', 'a.name', 'b.content', 'c.type as data_source_type', 
            'c.name as data_source_name', 'c.id as data_source_id', 'c.url',
            'c.port', 'c.username', 'c.password', 'c.charset', 'c.database', 'c.ext');
   
    for (const dataset of datasets) {
      // console.log('dataset.data_set_id', dataset.data_set_id, dataset.push_cron)
        if (dataSetJobs[dataset.data_set_id]) dataSetJobs[dataset.data_set_id].cancel(); 
         dataSetJobs[dataset.data_set_id] = schedule.scheduleJob(dataset.push_cron, async function () {
            // console.log(`Pushing data to channel${dataset.data_channel_id}`);
            let result = null;
            switch (dataset.data_source_type) {
              case "mysql":
                result = await executeHelper.executeQueryWithMysql(
                  {
                    host: dataset.url,
                    user: dataset.username,
                    password: dataset.password,
                    database: dataset.database,
                    port: dataset.port,
                    charset: dataset.charset,
                  },
                  dataset.content
                );
                break;
              case "postgresql":
                result = await executeHelper.executeQueryWithPg(
                  {
                    host: dataset.url,
                    user: dataset.username,
                    password: dataset.password,
                    database: dataset.database,
                    port: dataset.port,
                  },
                  dataset.content
                );
                break;
              case "javascript(vm)":
                result = await executeHelper.executeCodeInSandbox(dataset.content);
                if (result.error != null) {
                  // 抛出异常
                  throw new Error(result.error);
                }
                break; 
                case "javascript(expert)":
                  result = await executeHelper.executeCodeDirect(dataset.content);
                  if (result.error != null) {
                    // 抛出异常
                    throw new Error(result.error);
                  }
                  break;
              default:
                res.json({
                  data: null,
                  msg: "data_source_type is not supported",
                  code: 500,
                });
                break;
            }
            pushDataToChannel(`channel${dataset.data_channel_id}`, { message: `Hello from channel${dataset.data_channel_id}`, timestamp: new Date(), result }, WebSocket);
        });
    }
}


module.exports = {
  generateJobs,
  schedule
}