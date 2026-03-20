require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect("mongodb://localhost:27017/marvel");

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
const userRoutes = require("./routes/user");

app.use(charactersRoutes);
app.use(comicsRoutes);
app.use(charRoutes);
app.use(comRoutes);
app.use(userRoutes);

app.all(/.*/, (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started 💪");
});
