import mysql from 'mysql2/promise';

// MySQL Connection Pool for PRODUCTION (InfinityFree)
let pool: mysql.Pool | null = null;

// Load config dari file config.production.js (jika ada)
let productionConfig: any = null;
try {
  productionConfig = require('./config.production.js');
  console.log('✅ Loaded production config from config.production.js');
} catch (error) {
  console.log('⚠️ No production config found, using environment variables');
}

export async function getConnection() {
  if (!pool) {
    // Prioritas: config.production.js → environment variables → default
    const config = {
      host: productionConfig?.DB_HOST || process.env.DB_HOST || 'localhost',
      user: productionConfig?.DB_USER || process.env.DB_USER || 'root',
      password: productionConfig?.DB_PASSWORD || process.env.DB_PASSWORD || '',
      database: productionConfig?.DB_NAME || process.env.DB_NAME || 'portfolio_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

    pool = mysql.createPool(config);
    
    console.log('✅ MySQL Connection Pool Created');
    console.log('📊 Config:', {
      host: config.host,
      user: config.user,
      database: config.database,
    });
  }
  
  return pool;
}

export async function query(sql: string, params?: any[]) {
  const connection = await getConnection();
  const [results] = await connection.execute(sql, params);
  return results;
}

export default { getConnection, query };
