import mongoose from "mongoose";

//1st create a schema
//2nd create a model
//3rd export the model
const messageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true } //automatically creates createdAt and updatedAt fields
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
