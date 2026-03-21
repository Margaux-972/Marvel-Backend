const User = require("../models/User");
const uid2 = require("uid2");
const express = require("express");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const router = express.Router();

router.post("/user/signup", async (req, res) => {
  try {
    // console.log("body => ", req.body); // body =>  { email: 'm@mail.com', account: { username: 'm' }, password: 'm' }
    // console.log(req.body.username);

    if (!req.body.email || !req.body.password || !req.body.username) {
      return res
        .status(400)
        .json({ message: "Email, password and username are mandatory" });
    }

    // Si en DB, j'ai déjà un User dont la clef email contient req.body.email => ERROR

    const userAlreadyExist = await User.findOne({ email: req.body.email });

    // console.log("userAlreadyExist => ", userAlreadyExist);

    if (userAlreadyExist) {
      return res.status(409).json({ message: "This email is already used" });
    }

    const token = uid2(64);
    const salt = uid2(16);
    const hash = SHA256(salt + req.body.password).toString(encBase64);

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      token: token,
      hash: hash,
      salt: salt,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      token: newUser.token,
      account: newUser.account,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    // console.log("body => ", req.body);

    const user = await User.findOne({ email: req.body.email });
    // console.log("user => ", user);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newHash = SHA256(user.salt + req.body.password).toString(encBase64);
    // console.log(user.hash === newHash);

    if (newHash !== user.hash) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({
      _id: user._id,
      token: user.token,
      account: user.account,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/favorites/comics", async (req, res) => {
  try {
    const comic = req.body.comic;

    const user = await User.findOne({
      token: req.headers.authorization,
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!user.favorites) {
      user.favorites = { comics: [] };
    }

    if (!user.favorites.comics) {
      user.favorites.comics = [];
    }

    const formattedComic = {
      _id: comic._id.toString(),
      title: comic.title,
      thumbnail: comic.thumbnail,
    };

    const index = user.favorites.comics.findIndex(
      (fav) => fav._id.toString() === comic._id.toString(),
    );
    if (index !== -1) {
      user.favorites.comics.splice(index, 1);
    } else {
      user.favorites.comics.push(formattedComic);
    }

    await user.save();

    res.status(200).json(user.favorites.comics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/favorites/characters", async (req, res) => {
  try {
    const character = req.body.character;

    const user = await User.findOne({
      token: req.headers.authorization,
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!user.favorites) {
      user.favorites = { characters: [] };
    }

    if (!user.favorites.characters) {
      user.favorites.characters = [];
    }

    const formattedCharacter = {
      _id: character._id.toString(),
      name: character.name,
      thumbnail: character.thumbnail,
    };

    const index = user.favorites.characters.findIndex(
      (fav) => fav._id.toString() === character._id.toString(),
    );

    if (index !== -1) {
      user.favorites.characters.splice(index, 1);
    } else {
      user.favorites.characters.push(formattedCharacter);
    }

    await user.save();

    res.status(200).json(user.favorites.characters);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
});

router.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({
      token: req.headers.authorization,
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({
      favorites: user.favorites,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
