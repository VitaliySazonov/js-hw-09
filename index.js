const express = require("express"),
  app = express(),
  path = require("path"),
  PORT = process.env.PORT || 5000,
  members = require("./Members"),
  exphbs = require("express-handlebars");

// Basic routing
// app.get('/api/members', (req, res) => {
//   res.json(members)
// })

// app.get('/api/members/:id', (req, res) => {
//   console.log(req.params.id)
//   let found = members.some(member => member.id === Number(req.params.id))
//   console.log(found)
//   if (found) {
//     res.send(members.filter(member => member.id === Number(req.params.id)))
//   } else {
//     res.status(400).json({
//       msg: 'Not found!'
//     })
//   }
// })


// Handlebar
let hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

// Routs for example
app.get("/", (req, res) => {
  res.render("index", {
    isHome: true,
    title: 'Home',
    members
  })
})
app.get("/about", (req, res) => {
  res.render("about", {
    isAbout: true,
    title: 'About',
    members
  })
})

app.listen(PORT, () => console.log(`App started on ${PORT}...`));
app.use(express.static(path.join(__dirname, "public")));
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// API routes
app.use("/api/members", require("./routes/api/members"));
app.use("/api/users", require("./routes/api/users"));
