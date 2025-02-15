const { Pool } = require('pg');

// Kingbase连接配置（根据实际修改）
const config = {
  host: '100.113.145.121',
  port: 54321,  // Kingbase默认端口
  user: 'admin',
  password: '1qaz@WSX',
  database: 'test',
  // 如果使用SSL需要配置
  // ssl: { rejectUnauthorized: false }
};

// 创建连接池
const pool = new Pool(config);

(async () => {
  try {
    // 测试连接
    const client = await pool.connect();
    console.log('Successfully connected to Kingbase!');

    // 执行测试查询
    const res = await client.query('SELECT 1 + 1 AS result');
    console.log('Test query result:', res.rows[0]);

    client.release();
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await pool.end(); // 关闭连接池
  }
})();