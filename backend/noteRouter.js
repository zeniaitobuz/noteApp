import { Router } from "express";
import notesModel from "./server.js";

const noteRouter = Router();

//ading the note
noteRouter.post("/addnote", async (request, response, next) => {
  try {
    const { name, content } = request.body;
    if (!name.length) {
      next(new Error("Name field missing"));
    } else if (!content.length) {
      next(new Error("Content field missing"));
    }
    const notes = new notesModel(request.body);
    const res = await notes.save();
    if (res?._id) {
      response.send({
        data: notes,
        message: "successfully added",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
});

//updating the notes
noteRouter.put("/updatenote", async (request, response, next) => {
  try {
    const { _id, name, content } = request.body;
    if (!_id.length) {
      next(new Error("Id field missing"));
    }
    const notes = new notesModel(request.body);
    const res = await notesModel.findByIdAndUpdate(
      { _id: _id },
      { name: name, content: content },
      {
        $set: {
          name: name,
          content: content,
        },
      }
    );
    if (res?._id) {
      response.send({
        data: notes,
        message: "successfully updated",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
});

//deleting the notes
noteRouter.delete("/deletenote", async (request, response, next) => {
  try {
    const { _id } = request.body;
    if (!_id.length) {
      next(new Error("Id field missing"));
    }
    const notes = new notesModel(request.body);
    const res = await notesModel.findOneAndDelete({ _id: _id });
    if (res?._id) {
      response.send({
        data: notes,
        message: "successfully deleted",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
});

//reading the notes
noteRouter.get("/notes", async (request, response, next) => {
  try {
    const notess = await notesModel.find();
    response.send({
      data: notess,
      message: "successfully showed all data",
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

export default noteRouter;
