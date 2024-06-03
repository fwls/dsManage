const mysql = require("mysql2");

// 封装函数：连接MySQL并执行查询，返回查询结果
/**
 *
 * @param {*} host
 * @param {*} user
 * @param {*} password
 * @param {*} database
 * @param {*} query
 * @returns
 * async function main() {
 *    try {
 *        const results = await executeQueryWithConnection(
 *            'localhost',
 *            'your_username',
 *            'your_password',
 *            'your_database',
 *            'SELECT * FROM your_table_name'
 *        );
 *        console.log(results);
 *    } catch (error) {
 *        console.error('Error:', error);
 *    }
 * }
 *
 */
async function executeQueryWithMysql(connectionConfig, query) {
  // 创建数据库连接
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(connectionConfig);

  try {
    // 连接到MySQL
    await connection.connect();

    // 执行查询
    try {
      const [results, fields] = await connection.query(query);

      // console.log(results); // results contains rows returned by server
      // console.log(fields); // fields contains extra meta data about results, if available
      return {
        result: results,
        error: null,
      };
    } catch (err) {
      console.log(err);
      return {
        result: null,
        error: err.message,
      };
    }

    // 关闭数据库连接
    connection.end();

    // 返回查询结果
  } catch (error) {
    // 如果连接已建立，则尝试关闭连接
    if (connection.state !== "disconnected") {
      connection.end();
    }

    // 抛出错误
    throw error;
  }
}

// 封装函数：连接pgSQL并执行查询，返回查询结果
/**
 * @param {*} connectionConfig
 * @param {*} query
 * @param {*} params
 * @returns
 *
 *  * async function main() {
 *    try {
 *        const connectionConfig = {
 *            user: 'your_username',
 *            host: 'localhost',
 *            database: 'your_database',
 *            password: 'your_password',
 *            port: 5432, // PostgreSQL默认端口
 *        };
 *
 *        const query = 'SELECT * FROM your_table_name WHERE some_column = $1';
 *        const params = [123]; // 示例参数
 *
 *         const results = await executeQueryWithPg(connectionConfig, query, params);
 *         console.log(results);
 *     } catch (error) {
 *         console.error('Error:', error);
 *     }
 * }
 */
async function executeQueryWithPg(connectionConfig, query, params = []) {
  const { Client } = require("pg");
  const client = new Client(connectionConfig);

  try {
    await client.connect();
    // 执行查询
    const result = await client.query(query, params);

    // 返回查询结果
    return result.rows;
  } catch (error) {
    // 如果有错误，关闭连接池并抛出错误
    client.end();
    throw error;
  } finally {
    // 确保在函数结束时关闭连接池
    client.end();
  }
}

/**
 * Executes the given JavaScript code in a sandboxed environment.
 *
 * @param {string} code - The JavaScript code to be executed.
 * @return {Promise} A promise that resolves to the result of the code execution or rejects with an error.
 *
 * // 使用示例
 * const code = 'let a = 1 + 2; a * 3;';
 * const result = executeCodeInSandbox(code);
 * console.log(util.inspect(result, { depth: null })); // 输出 9
 *
 * const faultyCode = 'let b = 1 / 0;'; // 这将抛出一个错误
 * const faultyResult = executeCodeInSandbox(faultyCode);
 * console.error(util.inspect(faultyResult, { depth: null, colors: true })); // 输出错误信息
 *
 */
async function executeCodeInSandbox(code) {
  const vm = require("vm");

  // 不安全的 JavaScript 代码

  // 创建一个沙箱环境
  const sandbox = {
    // 可以在这里定义沙箱中的全局变量
  };

  const context = vm.createContext(sandbox);

  try {
    // 在沙箱环境中执行代码
    var result = vm.runInNewContext(code, context);

    // 输出结果，注意，由于在沙箱中，`process` 不可访问
    // console.log("script", result);
    return {
      result,
      error: null,
    };
  } catch (err) {
    //打印超时的 log
    return {
      result,
      error: err.message,
    };
  }
}

async function executeCodeDirect(code) {
  try {
    const result = await eval(code);
    return {
      result,
      error: null,
    };
  } catch (err) {
    //打印超时的 log
    return {
      result,
      error: err.message,
    };
  }
}

module.exports = {
  executeQueryWithMysql,
  executeQueryWithPg,
  executeCodeInSandbox,
  executeCodeDirect
};
