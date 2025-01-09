const mongoose = require("mongoose");
const Item = require("../models/item");
const shirts = require("./shirts");

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

const seedDB = async () => {
  await Item.deleteMany({});
  // Because the schema is in the same format as the dataset that we have so we put it directly(Format of title, price, description, size)
  await Item.insertMany(shirts);
  // To close the connection
  mongoose.connection.close();
};

seedDB();
