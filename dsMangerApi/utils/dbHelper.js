const mysql = require("mysql2");
const { Pool } = require("pg");

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
export async function executeQueryWithConnection(
  host,
  user,
  password,
  database,
  query
) {
  // 创建数据库连接
  const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    port,
    charset,
  });

  try {
    // 连接到MySQL
    await connection.connect();

    // 执行查询
    const [results, fields] = await new Promise((resolve, reject) => {
      connection.query(query, (error, rows, columns) => {
        if (error) {
          reject(error);
        } else {
          resolve([rows, columns]);
        }
      });
    });

    // 关闭数据库连接
    connection.end();

    // 返回查询结果
    return results;
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
export async function executeQueryWithPg(connectionConfig, query, params = []) {
  // 创建一个连接池
  const pool = new Pool(connectionConfig);

  try {
    // 执行查询
    const result = await pool.query(query, params);

    // 返回查询结果
    return result.rows;
  } catch (error) {
    // 如果有错误，关闭连接池并抛出错误
    pool.end();
    throw error;
  } finally {
    // 确保在函数结束时关闭连接池
    pool.end();
  }
}

const vm = require("vm");
const util = require("util");

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
export async function executeCodeInSandbox(code) {
  // Create a sandbox object to isolate global variables.
  const sandbox = {};

  // Create a new context to isolate the global environment.
  const context = vm.createContext(sandbox);

  // Compile the script with the given code.
  const script = new vm.Script(code, {
    // Set any compilation options if needed.
  });

  try {
    // Execute the script in the sandbox context.
    const result = script.runInContext(context);
    // Return the result of the code execution.
    return result;
  } catch (err) {
    // Catch and return any errors that occur during execution.
    return { error: err };
  }
}
