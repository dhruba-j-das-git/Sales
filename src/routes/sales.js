import express from 'express';
import { getDatabase } from '../database/config.js';

const router = express.Router();

router.get('/summary', (req, res) => {
  const db = getDatabase();
  const result = db.exec(`
    SELECT 
      strftime('%Y-%m', sale_date) as month,
      SUM(total_amount) as total_sales,
      COUNT(*) as number_of_transactions,
      AVG(total_amount) as average_sale_amount
    FROM sales
    GROUP BY strftime('%Y-%m', sale_date)
    ORDER BY month DESC
  `);
  
  res.json(result[0]?.values || []);
});

router.get('/by-customer-type', (req, res) => {
  const db = getDatabase();
  const result = db.exec(`
    SELECT 
      c.customer_type,
      SUM(s.total_amount) as total_sales,
      COUNT(*) as number_of_transactions
    FROM sales s
    JOIN customers c ON s.customer_id = c.customer_id
    GROUP BY c.customer_type
  `);
  
  res.json(result[0]?.values || []);
});

router.get('/by-product-category', (req, res) => {
  const db = getDatabase();
  const result = db.exec(`
    SELECT 
      p.category,
      SUM(s.total_amount) as total_sales,
      SUM(s.quantity) as units_sold
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
    GROUP BY p.category
  `);
  
  res.json(result[0]?.values || []);
});

router.get('/by-location', (req, res) => {
  const db = getDatabase();
  const result = db.exec(`
    SELECT 
      c.state,
      c.city,
      SUM(s.total_amount) as total_sales
    FROM sales s
    JOIN customers c ON s.customer_id = c.customer_id
    GROUP BY c.state, c.city
  `);
  
  res.json(result[0]?.values || []);
});

export default router;