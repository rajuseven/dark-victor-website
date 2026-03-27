const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let orders = [
  {
    id: 1001,
    productId: 2,
    productName: 'Obsidian Heavy Hoodie',
    qty: 1,
    price: 4299,
    customer: 'Victor',
    createdAt: new Date().toISOString()
  }
];

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'order-service' });
});

app.get('/api/orders', (_req, res) => {
  res.json(orders.slice().reverse());
});

app.post('/api/orders', (req, res) => {
  const { productId, productName, qty, price, customer } = req.body;

  const order = {
    id: Date.now(),
    productId,
    productName,
    qty,
    price,
    customer,
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  res.status(201).json(order);
});

app.listen(4002, () => console.log('order-service running on 4002'));