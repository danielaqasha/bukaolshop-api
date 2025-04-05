const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("API BukaOlshop Aktif");
});

// Endpoint: /produk?id_kategori=227144
app.get("/produk", async (req, res) => {
  const { id_kategori } = req.query;

  if (!id_kategori) {
    return res.status(400).json({ error: "Parameter 'id_kategori' wajib diisi." });
  }

  const token = "eyJhcHAiOiI4OTI1NCIsImF1dGgiOiIyMDIxMTIwNCIsInNpZ24iOiJMSXZwN2g1b29KWlVOYzc3eGJQODFRPT0ifQ==";
  const url = `https://openapi.bukaolshop.net/v1/app/produk?token=${token}&id_kategori=${id_kategori}&total_data=50`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil data dari Open API BukaOlshop" });
  }
});

app.listen(PORT, () => {
  console.log(`Server aktif di port ${PORT}`);
});
