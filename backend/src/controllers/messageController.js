import Message from "../../models/message.js";

export async function getAllMessages(_, res) {
  //_means we are not using req parameter
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); //newest first
    res
      .status(200)
      .json({ message: "Message fetched successfully", data: messages });
  } catch (error) {
    console.log("Error fetching messages:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getMessageById(req, res) {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Id not found" });
    res
      .status(200)
      .json({ message: "Message fetched successfully", data: message });
  } catch (error) {
    console.log("Error fetching messages:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function createAMessage(req, res) {
  try {
    const { title, content } = req.body;
    const newMessage = new Message({ title, content });
    const savedMessage = await newMessage.save();
    res
      .status(201)
      .json({ message: "Message created successfully", data: savedMessage });
  } catch (error) {
    console.log("Error fetching messages:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function updateAMessage(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updateAMessage = await Message.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!updateAMessage) {
      return res.status(404).json({ message: "Id not found" });
    }
    res
      .status(200)
      .json({ message: "Message updated successfully", data: updateAMessage });
  } catch (error) {
    console.log("Error fetching messages:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteAMessage(req, res) {
  try {
    const { id } = req.params;
    const deleteAMessage = await Message.findByIdAndDelete(id);

    if (!deleteAMessage) {
      return res.status(404).json({ message: "Id not found" });
    }
    res
      .status(200)
      .json({ message: "Message deleted successfully", data: deleteAMessage });
  } catch (error) {
    console.log("Error fetching messages:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
