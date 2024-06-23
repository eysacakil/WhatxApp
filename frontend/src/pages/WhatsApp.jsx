import React, { useState, useEffect } from "react";
import LeftMenu from "../components/Home/LeftMenu";
import ChatDetails from "../components/Home/ChatDetails";
import LoadingScreen from "../components/Home/LoadingScreen";

function WhatsApp() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const id = setTimeout(() => {
      if (progress >= 100) setLoading(false);
      else {
        const increment = Math.floor(Math.random() * (10 + 1)) + 7;
        setProgress(progress + increment);
      }
    }, 300);

    return () => clearTimeout(id);
  }, [progress]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen progress={progress} />
      ) : (
        <div className="w-screen h-screen overflow-hidden">
          <div className="flex justify-start whatsapp-bp:justify-center items-center bg-[#111a21] h-screen">
            <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
              <LeftMenu onSelectChat={handleSelectChat} />
            </div>
            <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100">
              <ChatDetails selectedChat={selectedChat} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WhatsApp;
