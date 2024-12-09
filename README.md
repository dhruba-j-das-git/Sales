# AtliQ Hardware Sales Insights

This project provides sales analytics for AtliQ hardware business, focusing on brick & mortar sales trends. The system includes:

1. SQL Database with tables for:
   - Customers (including type: Brick & Mortar vs E-Commerce)
   - Products
   - Sales transactions

2. API endpoints for analytics:
   - Sales summary by month
   - Sales by customer type
   - Sales by product category
   - Sales by location

## Power BI Integration Instructions

To connect this data to Power BI:

1. Export the SQLite database data to CSV files using the API endpoints
2. In Power BI Desktop:
   - Use "Get Data" -> "Web API" 
   - Connect to each endpoint
   - Create relationships between the tables
   - Design visualizations for:
     - Monthly sales trends
     - Customer type comparison
     - Product category performance
     - Geographical sales distribution

