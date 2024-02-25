const express = require("express");
const router = express.Router();
const hiphop = require("../data/hiphop");

// ------------ MIDDLEWARE ------------- //
router.use(express.static("../src")); // stylesheet

// ---------- Template Engine ---------- //

// --------------------------------------- //
router
  .route("/")
  .get((req, res, next) => {
    let content = ``;
    let cTemplate =
      "<div class='w-100 d-flex justify-content-between bg-secondary text-light mb-1 p-2'>";

    // console.log(req.query);

    if (Object.keys(req.query).length > 0) {
      if (Object.keys(req.query).includes("songID")) {
        const song = hiphop.find((s) => s.id == req.query.songID);
        content +=
          cTemplate +
          `<div>${song.id} | ${song.title}</div><div>${song.artist}</div>` +
          "</div>";
      } else if (Object.keys(req.query).includes("songName")) {
        const song = hiphop.find(
          (s) => s.title.toLowerCase() == req.query.songName.toLowerCase()
        );
        content +=
          cTemplate +
          `<div>${song.id} | ${song.title}</div><div>${song.artist}</div>` +
          "</div>";
      }
    } else {
      for (let song of hiphop) {
        content +=
          cTemplate +
          `<div>${song.id} | ${song.title}</div><div>${song.artist}</div></div>`;
      }
    }
    // console.log(res);
    res.render("hiphop", { title: "HipHop", content: `${content}` });
  })
  .post((req, res, rext) => {
    let content = ``;
    let cTemplate =
      "<div class='w-100 d-flex justify-content-between bg-secondary text-light mb-1 p-2'>";
    hiphop.push({
      id: hiphop[hiphop.length - 1].id + 1,
      artist: req.body.songArtist,
      title: req.body.songName,
    });
    for (let song of hiphop) {
      content +=
        cTemplate +
        `<div>${song.id} | ${song.title}</div><div>${song.artist}</div></div>`;
    }
    res.render("hiphop", { title: "HipHop", content: `${content}` });
  })
  .patch((req, res, next) => {
    const song = hiphop.find((s, i) => {
      if (s.id == req.query.songID) {
        hiphop[i].artist = req.query.songArtist;
        hiphop[i].title = req.query.songName;
        res.json(hiphop[i]);
      } else {
        next();
      }
    });
  })
  .delete((req, res, next) => {
    const song = hiphop.find((s, i) => {
      if (s.id == req.query.songID) {
        hiphop.splice(i, 1);
        hiphop.json(hiphop);
        return true;
      } else {
        next();
      }
    });
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
