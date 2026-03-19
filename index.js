require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Bienvenue dans le MGX MCU" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
const charRoutes = require("./routes/char");
const comRoutes = require("./routes/com");

app.use(charactersRoutes);
app.use(comicsRoutes);
app.use(charRoutes);
app.use(comRoutes);

app.all(/.*/, (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 💪");
});
