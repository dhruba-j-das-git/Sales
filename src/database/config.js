import initSqlJs from 'sql.js';

let db = null;

export async function initDatabase() {
  if (!db) {
    const SQL = await initSqlJs();
    db = new SQL.Database();
  }
  return db;
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}