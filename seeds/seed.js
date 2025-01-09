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
  // Clear existing data
  await Item.deleteMany({});
  console.log("Existing items deleted.");

  // Loop through the shirts array and save each item
  for (i = 0; i < shirts.length; i++) {
    const shirt = new Item({
      title: `${shirts[i].title}`,
      price: `${shirts[i].price}`,
      description: `${shirts[i].description}`,
      size: `${shirts[i].size}`,
    });
    await shirt.save();
  }
  // To close the connection
  mongoose.connection.close();
};

seedDB();
