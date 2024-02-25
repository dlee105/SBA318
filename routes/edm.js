const express = require("express");
const router = express.Router();
const edm = require("../data/edm");
const error = require("../utilities/error");

// ------------ MIDDLEWARE ------------- //
router.use(express.static("../src")); // stylesheet

// --------------------------------------- //
router
  .route("/")
  .get((req, res, next) => {
    // GET REQUEST FOR /API/EDM
    let content = ``;
    let cTemplate =
      "<div class='w-100 d-flex justify-content-between bg-secondary text-light mb-1 p-2'>";

    // console.log(req.query, edm);

    if (Object.keys(req.query).length > 0) {
      if (
        Object.keys(req.query).includes("songID") &&
        req.query.songID <= edm.length
      ) {
        const song = edm.find((s) => s.id == req.query.songID);
        content +=
          cTemplate +
          `<div>${song.title}</div><div>${song.artist}</div>` +
          "</div>";
      } else if (
        Object.keys(req.query).includes("songName") &&
        edm.find((s) => s.title === req.query.songName)
      ) {
        const song = edm.find(
          (s) => s.title.toLowerCase() == req.query.songName.toLowerCase()
        );
        content +=
          cTemplate +
          `<div>${song.title}</div><div>${song.artist}</div>` +
          "</div>";
      } else {
        next(error(400, "Invalid Input"));
      }
    } else {
      for (let song of edm) {
        content +=
          cTemplate + `<div>${song.title}</div><div>${song.artist}</div></div>`;
      }
    }
    res.render("EDM", { title: "EDM", content: `${content}` });
  })
  .post((req, res, next) => {
    // -----------------------------------POST REQUEST
    // console.log(req.body);
    let content = ``;
    let cTemplate =
      "<div class='w-100 d-flex justify-content-between bg-secondary text-light mb-1 p-2'>";
    edm.push({
      id: edm[edm.length - 1].id + 1,
      artist: req.body.songArtist,
      title: req.body.songName,
    });
    res.json(edm[edm.length - 1]);
  });

router.get("/:id", (req, res, next) => {
  const song = edm.find((s) => s.id == req.params.id);
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
