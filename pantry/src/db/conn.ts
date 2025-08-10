import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("pantry.db");

export async function migrate() {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY NOT NULL,
      barcode TEXT,
      name TEXT NOT NULL,
      qty REAL NOT NULL DEFAULT 1,
      unit TEXT DEFAULT 'ea',
      location TEXT DEFAULT 'pantry',
      expires_on TEXT,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_items_barcode ON items(barcode);
    CREATE INDEX IF NOT EXISTS idx_items_name ON items(name);
  `);
}
