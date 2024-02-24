//REQS
// 1. Create and use at least two pieces of custom middleware.
// 2. Create and use error-handling middleware. (done)
// 3. Use at least three different data categories (e.g., users, posts, or comments).
// 4. Utilize reasonable data structuring practices.

// 5. Create GET routes for all data that should be exposed to the client.
// 6. Create POST routes for data, as appropriate. At least one data category should allow for client creation via a POST request.
// 7. Create PATCH or PUT routes for data, as appropriate. At least one data category should allow for client manipulation via a PATCH or PUT request.
// 8. Create DELETE routes for data, as appropriate. At least one data category should allow for client deletion via a DELETE request.
// 9. Include query parameters for data filtering, where appropriate. At least one data category should allow for additional filtering through the use of query parameters.

// 10. Utilize route parameters, where appropriate.
// 11. Adhere to the guiding principles of REST.
// 12. Create and render at least one view using a view template and template engine. This can be a custom template engine or a third-party engine.
// 13. Use simple CSS to style the rendered views.
// 14. Include a form within a rendered view that allows for interaction with your RESTful API.
// 15. Utilize reasonable code organization practices.
// 16. Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).

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
