const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/characters", async (req, res) => {
  try {
    let limit = 100;
    let queries = "";
    if (req.query.name) {
      queries = queries + "&name=" + req.query.name;
    }
    if (req.query.limit) {
      limit = req.query.limit;
      queries = queries + "&limit=" + req.query.limit;
    }
    if (req.query.page) {
      queries = queries + "&skip=" + (req.query.page - 1) * limit;
    }
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=" +
        process.env.MARVEL_API_KEY +
        queries,
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
