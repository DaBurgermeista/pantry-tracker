import { db } from "./conn";

export type Item = {
  id?: number;
  barcode?: string | null;
  name: string;
  qty: number;
  unit?: string;
  location?: "pantry" | "fridge" | "freezer";
  expires_on?: string | null;
  updated_at?: string;
};

const now = () => new Date().toISOString();

export async function listItems() {
  return db.getAllAsync<Item>("SELECT * FROM items ORDER BY name ASC");
}

export async function bumpQty(id: number, delta: number) {
  await db.runAsync(
    `UPDATE items SET qty = MAX(0, qty + ?), updated_at = ? WHERE id = ?`,
    [delta, new Date().toISOString(), id]
  );
}

export async function upsertItem(i: Item) {
  if (i.id) {
    await db.runAsync(
      `UPDATE items SET barcode=?, name=?, qty=?, unit=?, location=?, expires_on=?, updated_at=? WHERE id=?`,
      [
        i.barcode ?? null,
        i.name,
        i.qty,
        i.unit ?? "ea",
        i.location ?? "pantry",
        i.expires_on ?? null,
        now(),
        i.id,
      ]
    );
    return i.id;
  }
  const r = await db.runAsync(
    `INSERT INTO items (barcode, name, qty, unit, location, expires_on, updated_at) VALUES (?,?,?,?,?,?,?)`,
    [
      i.barcode ?? null,
      i.name,
      i.qty,
      i.unit ?? "ea",
      i.location ?? "pantry",
      i.expires_on ?? null,
      now(),
    ]
  );
  return r.lastInsertRowId;
}
