import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

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

//ading the note
app.post("/addnote", async (request, response) => {
  const notes = new notesModel(request.body);
  try {
    await notes.save();
    response.send({
      data: notes,
      message: "successfully added",
      status: 200,
    });
  } catch (error) {
    response.send({
      data:null,
      message:error,
      status:500,
    });
  }
});

//updating the notes
app.put("/updatenote", async (request, response) => {
  const notes = new notesModel(request.body);
  try {
    const updatedData = await notesModel.findOneAndUpdate(
      { name: request.body.name },
      { name: request.body.updatedname, content: request.body.updatedcontent },
      {
        $set: {
          name: request.body.updatedname,
          content: request.body.updatedcontent,
        },
      }
    );
    console.log(updatedData);
    response.send({
      data: notes,
      message: "successfully updated",
      status: 200,
    });
  } catch (error) {
    response.send({
      data:null,
      message:error,
      status:500,
    });
  }
});

//deleting the notes
app.delete("/deletenote", async (request, response) => {
  const notes = new notesModel(request.body);
  try {
    await notesModel.findOneAndDelete({ _id: request.body._id });
    response.send({
      data: notes,
      message: "successfully deleted",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
});

//reading the notes
app.get("/notes", async (request, response) => {
  const notess = await notesModel.find({});
  try {
    response.send({
      data: notess,
      message: "successfully read",
      status: 200,
    });
  } catch (error) {
    response.send({
      data:null,
      message:error,
      status:500,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
