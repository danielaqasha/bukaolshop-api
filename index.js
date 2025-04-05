const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'URL tidak ditemukan' });

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const results = [];

    $('.produklist .produk-item').each((i, el) => {
      const link = $(el).find('a').attr('href');
      const nama = $(el).find('h3').text().trim();
      const harga = $(el).find('.harga').text().trim();

      if (link && nama && harga) {
        results.push({
          link: 'https://mastapay.olshopku.com' + link,
          nama,
          harga
        });
      }
    });

    console.log("Jumlah produk ditemukan:", results.length);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data', detail: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API aktif di port ${PORT}`);
});
