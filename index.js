const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('BukaOlshop API is running!');
});

app.get('/kategori/:slug', async (req, res) => {
  const { slug } = req.params;
  const fullUrl = `https://mastapay.olshopku.com/kategori/${slug}`;

  const apiUrl = `https://api.nielz.my.id/api/v2/fitur/bo`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        url: fullUrl,
        activation: 'nielzbo',
        tipe: 'produk'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Gagal ambil data:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data produk dari kategori' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
