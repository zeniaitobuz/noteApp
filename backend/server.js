import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import noteRouter from './noteRouter.js';


const notesSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});

const notesModel = mongoose.model("notelist", notesSchema);

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const username = "zenia";
const password = "zenia10banerjee";
const cluster = "cluster0.zqzveri";
const dbname = "notes";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("Error in MongoDb connection: " + error);
});
db.once("open", function () {
  console.log("Connected successfully");
});


app.use(noteRouter);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
