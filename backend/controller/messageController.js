const Message = require("../models/Message");
const User = require("../models/User");

let clients = [];

const longPoll = (req, res) => {
  try {
    const userId = req.params.userId;
    clients.push({ userId, res });

    // Connection timeout to avoid hanging connections
    req.on("close", () => {
      clients = clients.filter((client) => client.res !== res);
    });
  } catch (error) {
    console.error("Error in longPoll:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  try {
    const { sender, receiver, msg } = req.body;
    const newMessage = new Message({ sender, receiver, msg });
    await newMessage.save();

    // Send new message to receiver clients
    clients = clients.filter((client) => {
      if (client.userId === receiver || client.userId === sender) {
        client.res.json({ message: newMessage });
        return false;
      }
      return true;
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in createMessage:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all messages between two users
const getChatDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { contactId } = req.query;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: contactId },
        { sender: contactId, receiver: userId },
      ],
    })
      .sort({ time: 1 })
      .populate("sender receiver", "firstName email profilePicture");

    const chats = {};

    messages.forEach((message) => {
      const receiverId = message.receiver._id.toString(); // Receiver ID'yi belirliyoruz
      const contactId =
        message.sender._id.toString() === userId
          ? message.receiver._id.toString()
          : message.sender._id.toString();
      const contactName =
        message.sender._id.toString() === userId
          ? message.receiver.firstName
          : message.sender.firstName;
      const contactProfilePicture =
        message.sender._id.toString() === userId
          ? message.receiver.profilePicture
          : message.sender.profilePicture;
      if (!chats[contactId]) {
        chats[contactId] = {
          pp: contactProfilePicture,
          contact: contactName,
          messages: [],
          unreadMsgs: 0,
          receiverId: receiverId, // Receiver ID'yi ekliyoruz
        };
      }
      chats[contactId].messages.push({
        msg: message.msg,
        time: message.time,
        sender: message.sender._id.toString() === userId ? "me" : "other",
      });
    });

    res.status(200).json(Object.values(chats));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllUsersWithMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const otherUsers = await User.find({ _id: { $ne: userId } });

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ time: 1 })
      .populate("sender receiver", "firstName lastName profilePicture");

    const usersWithMessages = otherUsers.map((otherUser) => {
      const userMessages = messages.filter(
        (message) =>
          message.sender._id.toString() === otherUser._id.toString() ||
          message.receiver._id.toString() === otherUser._id.toString()
      );

      const formattedMessages = userMessages.map((message) => ({
        msg: message.msg,
        time: message.time,
        sender: message.sender._id.toString() === userId ? "me" : "other",
      }));

      return {
        contact: `${otherUser.firstName} ${otherUser.lastName}`,
        profilePicture: otherUser.profilePicture,
        messages: formattedMessages,
        unreadMsgs: formattedMessages.length > 0 ? 0 : null,
        receiverId: otherUser._id.toString(),
      };
    });

    res.status(200).json(usersWithMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMessage,
  getAllUsersWithMessages,
  getChatDetails,
  longPoll,
};
