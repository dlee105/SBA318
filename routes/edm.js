const express = require("express");
const router = express.Router();
const edm = require("../data/edm");
const error = require("../utilities/error");

// ------------ MIDDLEWARE ------------- //
router.use(express.static("../src")); // stylesheet

// --------------------------------------- //
router
  .route("/")
  .patch((req, res, next) => {
    // THIS REQUEST WORK BUT NOT INSIDE THE HTML
    // I TESTED WITH POSTMAN & IT WORKS HOWEVER,
    // THE BUTTON INSIDE THE CLIENT WILL DO A GET
    // DESPITE ME HAVING ITS METHOD AS A PATCH
    // WILL WORK ON THIS AT A LATER TIME

    // IF SENT THE REQUEST USING AN EXTERNAL APP
    // THEN CLICK ON VIEW ALL AGAIN, YOU SHOULD SEE
    // THE CHANGES
    const song = edm.find((s, i) => {
      if (s.id == req.query.songID) {
        edm[i].artist = req.query.songArtist;
        edm[i].title = req.query.songName;
        res.json(edm[i]);
      } else {
        next();
      }
    });
  })
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
          `<div>${song.id} | ${song.title}</div><div>${song.artist}</div>` +
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
          `<div>${song.id} | ${song.title}</div><div>${song.artist}</div>` +
          "</div>";
      } else {
        next(error(400, "Invalid Input"));
      }
    } else {
      for (let song of edm) {
        content +=
          cTemplate +
          `<div>${song.id} | ${song.title}</div><div>${song.artist}</div></div>`;
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
    for (let song of edm) {
      content +=
        cTemplate +
        `<div>${song.id} | ${song.title}</div><div>${song.artist}</div></div>`;
    }
    res.render("EDM", { title: "EDM", content: `${content}` });
  })
  .delete((req, res, next) => {
    const song = edm.find((s, i) => {
      if (s.id == req.query.songID) {
        edm.splice(i, 1);
        res.json(edm);
        return true;
      } else {
        next();
      }
    });
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

{
  /* <form action="http://localhost:3000/API/EDM/" enctype='application/x-www-form-urlencoded' method="PATCH">
        <div class="mt-5 container-sm">
            <div>Modify ID</div>
            <input id="songID" name="songID" placeholder="Enter ID"/>
            <input id="songArtist" name="songArtist" placeholder="Change artist"/>
            <input id="songName" name="songName" placeholder="Change title"/>
            <input type="submit" value="Change"/>
        </div>
      </form>  
      <form action="http://localhost:3000/API/EDM/" enctype='application/x-www-form-urlencoded' method="DELETE">
        <div class="mt-5 container-sm">
            <div>Delete Song By ID</div>
            <input id="songID" name="songID" placeholder="Enter ID"/>
            <input type="submit" value="Delete"/>
        </div>
      </form>   */
}
