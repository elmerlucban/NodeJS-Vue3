const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on("connected", () => {
  console.log("MongoDB is connected");
});

mongoose.connection.on("error", (err) => {
  console.log("Failed connected", err);
});
