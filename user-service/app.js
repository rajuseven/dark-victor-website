const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const brandProfile = {
  name: 'Victor & Dark',
  headline: 'Two friends. One dark fashion vision.',
  story:
    'Victor brings structure and clean presentation. Dark brings edge and attitude. Together they launched a premium clothing store that blends sharp tailoring with street-luxury basics.',
  city: 'Rajamahendravaram inspired / global digital brand'
};

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'user-service' });
});

app.get('/api/users/me', (_req, res) => {
  res.json(brandProfile);
});

app.listen(4003, () => console.log('user-service running on 4003'));