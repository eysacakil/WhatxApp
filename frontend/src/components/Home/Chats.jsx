import React, { useState , useEffect } from 'react';
import Chat from './Chat';
import { chatsData } from  '../../data/whatsapp';

function Chats({ filter, searchText }) {
    const [ chats, setChats ] = useState(chatsData);

    useEffect(() => {
      const newChats = filter 
        ? chatsData.filter((chat) => chat.unreadMsgs)
        : chatsData.filter((chat) => chat.msg.toLowerCase().includes(searchText));
      setChats(newChats);
    }, [filter, searchText]);
    
  return (
    // Chats main container
    <div className='flex flex-col overflow-y-scroll cursor-pointer h-100'>
        {/* Chats */}
        {chats.map((chat, i) => {
            return (
              < Chat
                  pp={chat.pp}
                  contact={chat.contact}
                  msg={chat.msg}
                  time={chat.time}
                  unreadMsgs={chat.unreadMsgs}
                  active={i === 0}
              />
          );
        })}
    </div>
  );
}

export default Chats