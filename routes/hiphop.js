const express = require("express");
const router = express.Router();
const hiphop = require("../data/hiphop");

router.route("/").get((req, res, next) => {
  res.json(hiphop);
});

router.get("/api/hiphop/:id", (req, res, next) => {
  const song = hiphop.find((s) => s.id == req.params.id);
  if (song) res.json(song);
  else next();
});

module.exports = router;
