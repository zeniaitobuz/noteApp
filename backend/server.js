import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import noteRouter from "./noteRouter.js";
import notesModel from "./models.js";
import * as connection from "./conection.js";

connection.connc();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(noteRouter);

//when wrong url hits
app.use((req, res, next) => {
  next(new Error("Page not found"));
});

//when error in catch block
app.use((error, req, res, next) => {
  if (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

export default notesModel;
