const express = require("express");

const app = express();
const PORT = 3000;
// ..
app.use(express.static("./src"));

//..
const fs = require("fs");
// ..

app.engine("mymusiclib", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);
    return callback(null, rendered);
  });
});

// ..
app.set("views", "./views"); // specify the views directory
app.set("view engine", "mymusiclib"); // register the template engine

// ..
app.get("/", (req, res) => {
  const options = {
    title: "My Personal Music Collection",
    content:
      "Here, we've created a basic template engine using <code>app.engine()</code> \
    and the <code>fs</code> module, then used <code>res.render</code> to \
    render this page using custom content within the template.<br><br> \
    Generally, you won't want to create your own view engines, \
    but it important to understand how they work behind the scenes. \
    For a look at some popular view engines, check out the documentation for \
    <a href='http://localhost:3000/API/EDM'>EDM</a>, \
    <a href='http://localhost:3000/API/hiphop'>HipHop</a>, or \
    <a href='https://www.npmjs.com/package/ejs'>EJS</a>. \
    More complete front-end libraries like React, Angular, and Vue \
    also have Express integrations.",
  };
  res.render("home", options);
});
// ..

app.use("/api/EDM", require("./routes/edm"));
app.use("/api/hiphop", require("./routes/hiphop"));

app.use((err, req, res, next) => {
  res.status(404);
  res.json({ error: "Resource not found" });
});
// ..

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}.`);
});
