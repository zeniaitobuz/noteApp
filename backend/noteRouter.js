import { Router } from "express";

const noteRouter = Router();


//ading the note
noteRouter.post("/addnote", async (request, response) => {
    try {
  
      const { name, content } = request.body
      if(!name.length){
        throw new Error('Name field missing')
      }
    const notes = new notesModel(request.body);
      await notes.save();
      response.send({
        data: notes,
        message: "successfully added",
        success: true,
      });
    } catch (error) {
      response.send({
        data: null,
        message: error.message,
        success: false,
      });
    }
  });
  
  //updating the notes
  noteRouter.put("/updatenote", async (request, response) => {
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
      response.send({
        data: notes,
        message: "successfully updated",
        status: 200,
      });
    } catch (error) {
      response.send({
        data: null,
        message: error,
        status: 500,
      });
    }
  });
  
  //deleting the notes
  noteRouter.delete("/deletenote", async (request, response) => {
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
  noteRouter.get("/notes", async (request, response) => {
    const notess = await notesModel.find();
    try {
      response.send({
        data: notess,
        message: "successfully read",
        status: 200,
      });
    } catch (error) {
      response.send({
        data: null,
        message: error,
        status: 500,
      });
    }
  });

  export default noteRouter;
  