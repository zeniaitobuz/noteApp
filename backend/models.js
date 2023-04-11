import mongoose from "mongoose";

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

export default notesModel;
