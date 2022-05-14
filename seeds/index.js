const mongoose = require("mongoose");
const cities = require("./cities");
const Campground = require("../models/campground");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 5000) + 1000;

    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://placeimg.com/640/480/nature",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati libero nam culpa in fugiat amet debitis voluptatem at perspiciatis soluta! Repellat assumenda consequatur perspiciatis quas temporibus pariatur eos obcaecati soluta!",
      price,
    });

    await camp.save();
  }
};

seedDB().then(() => mongoose.connection.close());
