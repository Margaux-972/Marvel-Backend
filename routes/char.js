const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/character/" +
        req.params.characterId +
        "?apiKey=" +
        process.env.MARVEL_API_KEY,
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
