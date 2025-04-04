const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get("/", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing url parameter" });

  try {
    const response = await axios.get(url);
    const html = response.data;

    const produkRegex = /<a href="([^"]+)" class="product-list">(.*?)<\/a>/gs;
    const hasil = [];
    let match;

    while ((match = produkRegex.exec(html)) !== null) {
      const link = "https://mastapay.olshopku.com" + match[1];
      const nama = match[2].match(/<h3>(.*?)<\/h3>/s)?.[1]?.trim() ?? "Tanpa Nama";
      const harga = match[2].match(/<div class="price">(.*?)<\/div>/s)?.[1]?.trim() ?? "Tanpa Harga";

      hasil.push({ nama, harga, link });
    }

    res.json(hasil);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

app.listen(PORT, () => {
  console.log(`API aktif di port ${PORT}`);
});
