import { initDatabase } from './config.js';
import { createSchema } from './schema.js';

const customers = [
  ['Tech Solutions Ltd', 'Brick & Mortar', 'Mumbai', 'Maharashtra'],
  ['Digital Mart', 'E-Commerce', 'Delhi', 'Delhi'],
  ['Hardware Plus', 'Brick & Mortar', 'Bangalore', 'Karnataka']
];

const products = [
  ['External HDD 1TB', 'Storage', 89.99],
  ['Gaming Mouse', 'Peripherals', 49.99],
  ['Mechanical Keyboard', 'Peripherals', 129.99],
  ['27" Monitor', 'Displays', 299.99]
];

async function seedDatabase() {
  const db = await initDatabase();
  await createSchema();

  // Insert sample customers
  customers.forEach(([name, type, city, state]) => {
    db.run('INSERT INTO customers (customer_name, customer_type, city, state) VALUES (?, ?, ?, ?)',
      [name, type, city, state]);
  });

  // Insert sample products
  products.forEach(([name, category, price]) => {
    db.run('INSERT INTO products (product_name, category, price) VALUES (?, ?, ?)',
      [name, category, price]);
  });

  // Generate sample sales data
  for (let i = 0; i < 100; i++) {
    const customerId = Math.floor(Math.random() * 3) + 1;
    const productId = Math.floor(Math.random() * 4) + 1;
    const quantity = Math.floor(Math.random() * 5) + 1;
    const product = products[productId - 1];
    const totalAmount = quantity * product[2];
    
    const date = new Date();
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 6));
    
    db.run(`
      INSERT INTO sales (customer_id, product_id, sale_date, quantity, total_amount)
      VALUES (?, ?, ?, ?, ?)
    `, [customerId, productId, date.toISOString().split('T')[0], quantity, totalAmount]);
  }

  console.log('Database seeded successfully!');
}

seedDatabase().catch(console.error);