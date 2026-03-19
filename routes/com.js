const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/comic/:comicId", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comic/" +
        req.params.comicId +
        "?apiKey=" +
        process.env.MARVEL_API_KEY,
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
