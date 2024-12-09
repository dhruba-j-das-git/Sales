import { initDatabase } from './config.js';

export async function createSchema() {
  const db = await initDatabase();
  
  // Create tables
  db.run(`
    -- Customers table
    CREATE TABLE IF NOT EXISTS customers (
      customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_type TEXT CHECK(customer_type IN ('Brick & Mortar', 'E-Commerce')) NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL
    );

    -- Products table
    CREATE TABLE IF NOT EXISTS products (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL,
      category TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL
    );

    -- Sales table
    CREATE TABLE IF NOT EXISTS sales (
      sale_id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      product_id INTEGER,
      sale_date DATE NOT NULL,
      quantity INTEGER NOT NULL,
      total_amount DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    );

    -- Create indexes for better query performance
    CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(sale_date);
    CREATE INDEX IF NOT EXISTS idx_sales_customer ON sales(customer_id);
    CREATE INDEX IF NOT EXISTS idx_sales_product ON sales(product_id);
  `);
}