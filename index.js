const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());

app.get('/produk', async (req, res) => {
  try {
    const url = 'https://mastapay.olshopku.com/kategori/free-fire-382726';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const produk = [];
    $('.produk-item').each((i, el) => {
      const nama = $(el).find('.card-title').text().trim();
      const harga = $(el).find('.harga').text().trim();
      const link = $(el).find('a').attr('href');
      produk.push({ nama, harga, link: `https://mastapay.olshopku.com${link}` });
    });

    res.json(produk);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API aktif di port ${PORT}`));
