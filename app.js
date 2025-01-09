const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Item = require("./models/item");

mongoose.connect("mongodb://localhost:27017/Clothing-Brand", {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
});

// db variable is just for the reference
const db = mongoose.connection;
// This sets up an event listener for the "error" event and console.error.bind is the callback to handle the error in a certain way
db.on("error", console.error.bind(console, "Console Error:"));
// This sets up an event listener for the "open" event, which is emitted when the connection to the database is successfully established.
db.once("open", () => {
  console.log("Database Connected!!!");
});

const app = express();

app.set("view engine", "ejs");
// Without setting the correct "views" directory, Express would not know where to find the view templates, and rendering with res.render() would fail.
// So basically its like whenever we call "/" in a path it's the views directory
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/newitem", async (req, res) => {
  const item = new Item({
    title: "Turtle neck",
    description: "Black with small size",
  });
  await item.save();
  res.send(item);
});

app.listen(3000, () => {
  console.log("Serving on Port 3000");
});
