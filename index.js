const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'URL tidak ditemukan' });

  try {
    const response = await axios.get(url);
    console.log("Data berhasil diambil dari:", url); // Log URL yang diambil
    const html = response.data;

    // Contoh parsing sederhana
    const productRegex = /<a href="(\/produk\/[^"]+)[\s\S]*?<h3[^>]*>(.*?)<\/h3>[\s\S]*?<span[^>]*>(Rp[\d.]+)/g;
    const results = [];
    let match;

    while ((match = productRegex.exec(html)) !== null) {
      results.push({
        link: "https://mastapay.olshopku.com" + match[1],
        nama: match[2].trim(),
        harga: match[3].trim(),
      });
    }

    res.json(results);
  } catch (error) {
    console.error("Gagal fetch:", error.message); // Log error di terminal Railway
    res.status(500).json({ error: 'Gagal mengambil data', detail: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API aktif di port ${PORT}`);
});
