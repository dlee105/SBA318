const express = require("express");
const router = express.Router();
const hiphop = require("../data/hiphop");
const fs = require("fs");
const formData = new FormData();

// ------------ MIDDLEWARE ------------- //
router.use(express.static("../src")); // stylesheet

// ---------- Template Engine ---------- //

// --------------------------------------- //
router.route("/").get((req, res, next) => {
  let content = ``;
  let cTemplate =
    "<div class='w-100 d-flex justify-content-between bg-secondary text-light mb-1 p-2'>";

  // console.log(req.query);

  if (Object.keys(req.query).length > 0) {
    if (Object.keys(req.query).includes("songID")) {
      const song = hiphop.find((s) => s.id == req.query.songID);
      content +=
        cTemplate +
        `<div>${song.title}</div><div>${song.artist}</div>` +
        "</div>";
    } else if (Object.keys(req.query).includes("songName")) {
      const song = hiphop.find(
        (s) => s.title.toLowerCase() == req.query.songName.toLowerCase()
      );
      content +=
        cTemplate +
        `<div>${song.title}</div><div>${song.artist}</div>` +
        "</div>";
    }
  } else {
    for (let song of hiphop) {
      content +=
        cTemplate + `<div>${song.title}</div><div>${song.artist}</div></div>`;
    }
  }
  // console.log(res);
  res.render("hiphop", { title: "HipHop", content: `${content}` });
});

router.get("/:id", (req, res, next) => {
  const song = hiphop.find((s) => s.id == req.params.id);
  if (song) res.json(song);
  else next();
});

// ERRORS

// Error middleware
router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

router.use((err, req, res, next) => {
  // 404
  res.status(404);
  res.json({ error: "Resource not found" });
});

module.exports = router;
