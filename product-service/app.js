const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const products = [
  {
    id: 1,
    name: 'Midnight Crest Jacket',
    category: 'Outerwear',
    price: 6999,
    badge: 'New Arrival',
    fit: 'Tailored',
    fabric: 'Premium twill blend',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/images/jacket.svg',
    description: 'Sharp black jacket with structured shoulders and a clean evening silhouette.'
  },
  {
    id: 2,
    name: 'Obsidian Heavy Hoodie',
    category: 'Streetwear',
    price: 4299,
    badge: 'Best Seller',
    fit: 'Relaxed',
    fabric: '420 GSM cotton fleece',
    sizes: ['M', 'L', 'XL'],
    image: '/images/hoodie.svg',
    description: 'Luxury heavyweight hoodie built for layered street looks and all-day comfort.'
  },
  {
    id: 3,
    name: 'Noir Tapered Trousers',
    category: 'Bottomwear',
    price: 3899,
    badge: 'Limited',
    fit: 'Slim tapered',
    fabric: 'Stretch cotton',
    sizes: ['30', '32', '34', '36'],
    image: '/images/trousers.svg',
    description: 'Minimal trousers that move from office sharp to weekend evening with ease.'
  },
  {
    id: 4,
    name: 'Signature Monogram Tee',
    category: 'Essentials',
    price: 2199,
    badge: 'Core Drop',
    fit: 'Regular',
    fabric: 'Bio-washed cotton',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/images/tee.svg',
    description: 'Soft black tee with subtle gold branding and a premium finished neckline.'
  }
];

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'product-service' });
});

app.get('/api/products', (_req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((item) => item.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.listen(4001, () => console.log('product-service running on 4001'));