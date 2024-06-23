import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";
import { ImFolderDownload } from "react-icons/im";
import defaultUserImage from "../../assets/images/chat3.png"; // Varsayılan kullanıcı resmi
import { getTime } from "../../logic/whatsapp";

function Chats({ filter, searchText, onSelectChat }) {
  const [chats, setChats] = useState([]);
  const [allChats, setAllChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const user = JSON.parse(localStorage.getItem("user")); // localStorage'dan kullanıcıyı al
      if (user && user.userId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/messages/${user.userId}/users`
          ); // userId'yi kullanarak API isteği yap
          const chatData = response.data.map((chat) => ({
            ...chat,
            pp: chat.profilePicture || defaultUserImage,
          }));
          setChats(chatData);
          setAllChats(chatData);
          console.log("Chats fetched:", allChats);
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      } else {
        console.error("User not found in localStorage");
      }
    };

    fetchChats();
    const intervalId = setInterval(fetchChats, 5000); // Her 5 saniyede bir fetchChats fonksiyonunu çağır

    // Component unmount olduğunda interval'i temizle
    return () => clearInterval(intervalId);
  }, []); // Bu bağımlılık dizisi sadece bir kez çalışmasını sağlar

  useEffect(() => {
    const newChats = filter
      ? allChats.filter((chat) => chat.unreadMsgs)
      : allChats.filter((chat) =>
          chat.messages.some((message) =>
            message.msg.toLowerCase().includes(searchText.toLowerCase())
          )
        );
    setChats(newChats);
  }, [filter, searchText, allChats]); // Bu bağımlılık dizisi bağımlı değişkenlere göre çalışmasını sağlar

  return (
    <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">
      <div className="flex justify-between items-center w-100 min-h[55px] px-3 hover:bg-[#202d33]">
        <div className="flex justify-around items-center w-[150px]">
          <span className="text-emerald-500 text-lg">
            <ImFolderDownload />
          </span>
          <h5 className="text-white">Archived</h5>
        </div>
        <p className="text-emerald-500 text-xs font-light">7</p>
      </div>
      {allChats.map((chat, i) => {
        const lastMessage = chat.messages[chat.messages.length - 1];
        return (
          <Chat
            key={i}
            pp={chat.pp}
            contact={chat.contact}
            msg={lastMessage ? lastMessage.msg : ""}
            time={lastMessage ? getTime(lastMessage.time) : ""}
            unreadMsgs={chat.unreadMsgs}
            active={i === 0}
            onSelect={() => onSelectChat(chat)}
          />
        );
      })}
    </div>
  );
}

export default Chats;
