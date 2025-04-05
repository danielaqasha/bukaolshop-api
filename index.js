const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Route root
app.get('/', (req, res) => {
  res.send('BukaOlshop API is running!');
});

// Route dinamis untuk kategori
app.get('/kategori/:slug', async (req, res) => {
  const { slug } = req.params;
  const url = `https://mastapay.olshopku.com/kategori/${slug}`;
  const apiUrl = `https://api.nielz.my.id/api/v2/fitur/bo?url=${encodeURIComponent(url)}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data produk' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
