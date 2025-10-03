import mysql from 'mysql2/promise';

// MySQL Connection Pool
let pool: mysql.Pool | null = null;

export async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'portfolio_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    
    console.log('✅ MySQL Connection Pool Created');
  }
  
  return pool;
}

export async function query(sql: string, params?: any[]) {
  const connection = await getConnection();
  const [results] = await connection.execute(sql, params);
  return results;
}

export default { getConnection, query };
