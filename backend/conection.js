import mongoose from "mongoose";
import config from "./config.js";

export const connc = () => {
  mongoose.connect(
    `mongodb+srv://${config.username}:${config.password}@${config.cluster}.mongodb.net/${config.dbname}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("Error in MongoDb connection: " + error);
});
db.once("open", function () {
  console.log("Connected successfully");
});
