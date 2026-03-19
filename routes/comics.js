const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/comics", async (req, res) => {
  try {
    let limit = 100;
    let queries = "";
    if (req.query.title) {
      queries = queries + "&title=" + req.query.title;
    }
    if (req.query.limit) {
      limit = req.query.limit;
      queries = queries + "&limit=" + req.query.limit;
    }
    if (req.query.page) {
      queries = queries + "&skip=" + (req.query.page - 1) * limit;
    }
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=" +
        process.env.MARVEL_API_KEY +
        queries,
    );
    // console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics/" +
        req.params.characterId +
        "?apiKey=" +
        process.env.MARVEL_API_KEY,
    );
    // console.log(req.params.characterId);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
