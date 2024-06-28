
const { default: mongoose } = require('mongoose');
const Message = require('../models/Message');
const User = require('../models/User');

const createMessage = async (req, res) => {
    try {
        const { sender, receiver, msg } = req.body;
        const newMessage = new Message({ sender, receiver, msg });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const searchMessages = async (req, res) => {
    const { searchText, currentUserId } = req.params;
  
    if (typeof searchText !== 'string' || !mongoose.Types.ObjectId.isValid(currentUserId)) {
      return res.status(400).json({ error: 'Geçersiz arama metni veya kullanıcı kimliği' });
    }


    try {
      const messages = await Message.find({ msg: { $regex: new RegExp(searchText, 'i') } })
        .populate('sender', 'username')
        .populate('receiver', 'username');
  
      const formattedResults = messages.reduce((acc, msg) => {
        const contactName = msg.receiver.username;
        const message = {
          messageId: msg._id,
          msg: msg.msg,
          time: msg.time,
          sender: msg.sender._id.toString() === currentUserId ? 'me' : 'other',
        };
  
        const contactIndex = acc.findIndex(contact => contact.contact === contactName);
        if (contactIndex >= 0) {
          acc[contactIndex].messages.push(message);
        } else {
          acc.push({
            contact: contactName,
            messages: [message],
            receiverId: msg.receiver._id
          });
        }
  
        return acc;
      }, []);
  
      res.json(formattedResults);
    } catch (error) {
      console.error('Error searching messages:', error);
      res.status(500).json({ error: 'Mesaj arama hatası' });
    }
  };


  const getChatDetails = async (req, res) => {
    try {
        const { userId, contactId } = req.params;

        // İki kullanıcıyı tek sorgu ile al
        const users = await User.find({ _id: { $in: [userId, contactId] } });

        if (users.length !== 2) {
            return res.status(404).json({ error: 'User or contact not found' });
        }

        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: contactId },
                { sender: contactId, receiver: userId }
            ]
        })
        .sort({ time: 1 })
        .populate('sender receiver', 'firstName email profilePicture');

        const contact = users.find(user => user._id.toString() === contactId);

        const chatDetails = {
            pp: contact.profilePicture,
            contact: contact.firstName,
            messages: messages.map(message => ({
                messageId: message._id,
                msg: message.msg,
                time: message.time,
                sender: message.sender._id.toString() === userId ? 'me' : 'other'
            })),
            unreadMsgs: 0, 
            receiverId: contactId
        };

        res.status(200).json(chatDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllUsersWithMessages = async (req, res) => {
    try {
        const { userId } = req.params;

        // Kullanıcıyı kontrol et
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Kullanıcıya ait olmayan tüm kullanıcıları getir
        const otherUsers = await User.find({ _id: { $ne: userId } });

        // Kullanıcıya ait olan mesajları getir
        const messages = await Message.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        }).sort({ time: 1 }).populate('sender receiver', 'firstName lastName profilePicture');

        const usersWithMessages = otherUsers.map(otherUser => {
            const userMessages = messages.filter(
                message => message.sender._id.toString() === otherUser._id.toString() ||
                           message.receiver._id.toString() === otherUser._id.toString()
            );

            const formattedMessages = userMessages.map(message => ({
                msg: message.msg,
                time: message.time,
                sender: message.sender._id.toString() === userId ? 'me' : 'other'
            }));

            return {
                contact: `${otherUser.firstName} ${otherUser.lastName}`,
                profilePicture: otherUser.profilePicture,
                messages: formattedMessages,
                unreadMsgs: formattedMessages.length > 0 ? 0 : null,
                receiverId: otherUser._id.toString()
            };
        });

        res.status(200).json(usersWithMessages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(messageId)) {
            return res.status(400).json({ error: 'Invalid message ID' });
        }

        const message = await Message.findByIdAndDelete(messageId);

        console.log("medssage", message);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    createMessage,
    getAllUsersWithMessages,
    getChatDetails,
    deleteMessage,
    searchMessages
};
