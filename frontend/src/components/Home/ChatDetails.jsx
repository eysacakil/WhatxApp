import React, { useState } from "react";
import RoundedBtn from "./Common/RoundedBtn";
import { messagesData } from "../../data/whatsapp";
import { MdSearch, MdSend } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { cs1 } from "../../assets/whatsapp";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { ReceivedMessage, SentMessage } from './Messages';

function ChatDetails() {
  const [messages, setMessages] = useState(messagesData);

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
        <div className="flex items-center">
          {/* Profile Picture and Status */}
          <img
            src={cs1}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-1 cursor-pointer"
          />
          <div className="flex flex-col">
            <h1 className="text-white font-medium text-lg">Coding Spot</h1>
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
        className="bg-[#0a131a] bg-[url('assets/images/bg.webp')] bg-contain overflow-y-scroll h-full"
        style={{ padding: "12px 7%" }}
      >
        {/* Chat messages will go here */}
        {messages.map((message, index) => {
          if (message.isReceived) {
            switch (message.type) {
              case 'text':
                return <ReceivedMessage key={index} message={message} />;
              default:
                return null;
            }
          } else {
            switch (message.type) {
              case 'text':
                return <SentMessage key={index} message={message} />;
              default:
                return null;
            }
          }
        })}
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
          className="placeholder:text-[#8796a1] w-full h-[40px] bg-[#0a131a] rounded-lg text-sm border-none outline-none text-white"
        />
        <span className="ml-2 flex items-center">
          {/* Mic and Send Buttons */}
          <RoundedBtn icon={<BsFillMicFill />} />
          <RoundedBtn icon={<MdSend />} />
        </span>
      </div>
    </div>
  );
}

export default ChatDetails;
