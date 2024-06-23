import React, { useState, useEffect } from "react";
import axios from "axios";
import RoundedBtn from "./Common/RoundedBtn";
import { MdSearch, MdSend } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import EmptyChat from "./EmptyChat";
import { getTime } from "../../logic/whatsapp";

function ChatDetails({ selectedChat }) {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const getChatDetails = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        `http://localhost:5000/api/messages/${user.userId}?contactId=${selectedChat.receiverId}`
      );
      console.log("getchatdetailsworked", response.data);
      setMessages(response.data[0].messages);
    } catch (error) {
      console.log("error happened on getting details", error);
    }
  };

  useEffect(() => {
    let intervalId;

    const startPolling = () => {
      getChatDetails();
      intervalId = setInterval(() => {
        getChatDetails();
      }, 500); // 5 saniyede bir fetch yap
    };

    if (selectedChat) {
      startPolling();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); 
      }
    };
  }, [selectedChat]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !selectedChat) {
        console.error("User or selected chat not found");
        return;
      }

      const newMessage = {
        sender: user.userId,
        receiver: selectedChat.receiverId, // selectedChat'ten receiverId'yi aldığınızı varsayıyoruz
        msg: inputMessage,
        time: new Date().toISOString(),
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/messages",
          newMessage
        );
        setMessages([...messages, { ...newMessage, sender: "me" }]);
        setInputMessage("");
      } catch (error) {
        console.error("Error sending message", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!selectedChat) {
    return <EmptyChat />;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
        <div className="flex items-center">
          {/* Profile Picture and Status */}
          <img
            src={selectedChat.pp}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-1 cursor-pointer"
          />
          <div className="flex flex-col">
            <h1 className="text-white font-medium text-lg">
              {selectedChat.contact}
            </h1>
            <p className="text-[#8796a1] text-xs">online</p>
          </div>
        </div>
        {/* Search and Options Buttons */}
        <div className="flex justify-end items-center w-[85px]">
          <RoundedBtn icon={<MdSearch />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>

      {/* Chat Messages Section */}
      <div
        className="bg-[#0a131a] bg-[url('assets/images/bg.webp')] bg-contain flex flex-col overflow-y-scroll h-full"
        style={{ padding: "12px 2%" }}
      >
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg inline-block max-w-[75%] min-w-[10%] ${
                message.sender === "me"
                  ? "bg-green-950 text-white ml-auto"
                  : "bg-gray-300 text-black "
              }`}
            >
              <div className="break-words whitespace-pre-wrap">
                {message.msg}
              </div>
              <div className="flex justify-end text-xs text-[#8796a1] mt-1">
                {getTime(message.time)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-white"></div>
        )}
      </div>

      {/* Message Input Section */}
      <div className="flex items-center bg-[#202d33] w-full h-[70px] p-2">
        {/* Emoji Button */}
        <RoundedBtn icon={<BiHappy />} />
        <span className="mr-2">
          {/* Attach File Button */}
          <RoundedBtn icon={<AiOutlinePaperClip />} />
        </span>
        {/* Message Input Field */}
        <input
          type="text"
          placeholder="Type a message"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="placeholder:text-[#8796a1] w-full h-[40px] bg-[#0a131a] rounded-lg text-sm border-none outline-none text-white"
        />
        <span className="ml-2 flex items-center">
          {/* Mic and Send Buttons */}
          <RoundedBtn icon={<BsFillMicFill />} />
          <RoundedBtn icon={<MdSend />} onClick={handleSendMessage} />
        </span>
      </div>
    </div>
  );
}

export default ChatDetails;
