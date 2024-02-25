//REQS
// 1. Create and use at least two pieces of custom middleware.
// 2. Create and use error-handling middleware. (done)
// 3. Use at least three different data categories (e.g., users, posts, or comments). (DONE)
// 4. Utilize reasonable data structuring practices. (DONE)

// 5. Create GET routes for all data that should be exposed to the client. (DONE)
// 6. Create POST routes for data, as appropriate. At least one data category should allow for client creation via a POST request. (DONE)
// 7. Create PATCH or PUT routes for data, as appropriate. At least one data category should allow for client manipulation via a PATCH or PUT request. (DONE)
// 8. Create DELETE routes for data, as appropriate. At least one data category should allow for client deletion via a DELETE request. (DONE)
// 9. Include query parameters for data filtering, where appropriate. At least one data category should allow for additional filtering through the use of query parameters. (DONE)

// 10. Utilize route parameters, where appropriate. (DONE)
// 11. Adhere to the guiding principles of REST. (DONE)
// 12. Create and render at least one view using a view template and template engine. This can be a custom template engine or a third-party engine. (DONE)
// 13. Use simple CSS to style the rendered views. // I USED BOOTSTRAP :) (DONE)
// 14. Include a form within a rendered view that allows for interaction with your RESTful API. (DONE)
// 15. Utilize reasonable code organization practices. (DONE)
// 16. Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).

const express = require("express");
var bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const fs = require("fs");
// .. MIDDLEWARE
app.use(express.static("./src"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//..

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
    content: `<a class="btn btn-dark link-btn" href='http://localhost:3000/API/EDM'>EDM</a> \
    <a class="btn btn-dark link-btn" href='http://localhost:3000/API/hiphop'>HipHop</a> \
    <a class="btn btn-dark link-btn" href='http://localhost:3000/API/pop'>Pop</a> \
    <a class="btn btn-dark link-btn" href='http://localhost:3000/API/other'>Other</a> 
    `,
  };
  res.render("home", options);
});

// Route onclick
app.use("/api/EDM", require("./routes/edm"));
app.use("/api/hiphop", require("./routes/hiphop"));
app.use("/api/pop", require("./routes/pop"));

// Error middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.use((err, req, res, next) => {
  // 404
  res.status(404);
  res.json({ error: "Resource not found" });
});

// .. LISTENING
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}.`);
});
