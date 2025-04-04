const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get("/", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const produk = [];

    $(".produk-wrap").each((i, el) => {
      const nama = $(el).find(".produk-nama").text().trim();
      const harga = $(el).find(".produk-harga").text().trim();
      const link = $(el).find("a").attr("href");
      const fullLink = link.startsWith("http") ? link : `https://mastapay.olshopku.com${link}`;
      
      produk.push({ nama, harga, link: fullLink });
    });

    res.json(produk);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data produk", detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`API aktif di port ${PORT}`);
});
