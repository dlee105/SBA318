const express = require("express");
const router = express.Router();
const pop = require("../data/pop");

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
        const song = pop.find((s) => s.id == req.query.songID);
        content +=
          cTemplate +
          `<div>${song.id} | ${song.title}</div><div>${song.artist}</div>` +
          "</div>";
      } else if (Object.keys(req.query).includes("songName")) {
        const song = pop.find(
          (s) => s.title.toLowerCase() == req.query.songName.toLowerCase()
        );
        content +=
          cTemplate +
          `<div>${song.id} | ${song.title}</div><div>${song.artist}</div>` +
          "</div>";
      }
    } else {
      for (let song of pop) {
        content +=
          cTemplate +
          `${song.id} | <div>${song.title}</div><div>${song.artist}</div></div>`;
      }
    }
    // console.log(res);
    res.render("pop", { title: "Pop", content: `${content}` });
  })
  .post((req, res, rext) => {
    let content = ``;
    let cTemplate =
      "<div class='w-100 d-flex justify-content-between bg-secondary text-light mb-1 p-2'>";
    pop.push({
      id: pop[pop.length - 1].id + 1,
      artist: req.body.songArtist,
      title: req.body.songName,
    });
    for (let song of pop) {
      content +=
        cTemplate +
        `<div>${song.id} | ${song.id} | ${song.title}</div><div>${song.artist}</div></div>`;
    }
    res.render("pop", { title: "Pop", content: `${content}` });
  })
  .delete((req, res, next) => {
    const song = pop.find((s, i) => {
      if (s.id == req.query.songID) {
        pop.splice(i, 1);
        res.json(pop);
        return true;
      } else {
        next();
      }
    });
  })
  .patch((req, res, next) => {
    const song = pop.find((s, i) => {
      if (s.id == req.query.songID) {
        pop[i].artist = req.query.songArtist;
        pop[i].title = req.query.songName;
        res.json(pop[i]);
      } else {
        next();
      }
    });
  });

router.get("/:id", (req, res, next) => {
  const song = pop.find((s) => s.id == req.params.id);
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
