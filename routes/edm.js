const express = require("express");
const router = express.Router();
const edm = require("../data/edm");

router.route("/").get((req, res, next) => {
  res.json(edm);
});

router.get("/api/EDM/:id", (req, res, next) => {
  const song = edm.find((s) => s.id == req.params.id);
  if (song) res.json(song);
  else next();
});

module.exports = router;
