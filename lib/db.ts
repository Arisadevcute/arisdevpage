import path from 'path';
import fs from 'fs';

let db: any = null;

export function getDb() {
  if (db) return db;
  
  try {
    // Dynamically require better-sqlite3 to avoid bundling issues
    const Database = require('better-sqlite3');
    const dbDir = path.join(process.cwd(), 'data');
    
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    const dbPath = path.join(dbDir, 'blog.db');
    db = new Database(dbPath);
    db.pragma('foreign_keys = ON');
    
    // Initialize schema
    db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        author TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        published BOOLEAN DEFAULT 0
      );

      CREATE INDEX IF NOT EXISTS idx_published ON posts(published);
      CREATE INDEX IF NOT EXISTS idx_slug ON posts(slug);
    `);
    
    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

export default getDb();
