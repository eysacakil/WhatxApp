import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from '../../contexts/ProfileContext';
import RoundedBtn from '../Home/Common/RoundedBtn';
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { BiFilter } from "react-icons/bi";
import Chats from "../Home/Chats";
import defaultUser from '../../assets/default-user.svg'; // Yeni sembolü import edin

function LeftMenu({ onSelectChat }) {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { profile } = useProfile();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleProfileUpdate = () => {
    navigate('/profile-update');
  };

  return (
    <div className='flex flex-col border-r border-neutral-700 w-100 h-screen'>
      <div className='flex justify-between items-center bg-[#202d33] h-[60px] p-3 relative'>
        <div className='flex items-center'>
          <img 
            src={profile.profilePicture || defaultUser} 
            alt="profile_picture" 
            className='rounded-full w-[40px]' 
          />
          <span className='ml-2 text-white'>{`${profile.firstName} ${profile.lastName}`}</span>
        </div>
        <div className='flex justify-between w-[175px]'>
          <RoundedBtn icon={<MdPeopleAlt />} />
          <RoundedBtn icon={<TbCircleDashed />} />
          <RoundedBtn icon={<BsFillChatLeftTextFill />} />
          <RoundedBtn icon={<HiDotsVertical />} onClick={() => setMenuOpen(!menuOpen)} />
        </div>
        {menuOpen && (
          <div className='absolute top-[60px] right-0 bg-[#2a3942] text-white shadow-md rounded-md w-[200px]'>
            <ul>
              <li className='p-2 hover:bg-[#3b4a54] cursor-pointer' onClick={handleProfileUpdate}>Profili Güncelle</li>
              <li className='p-2 hover:bg-[#3b4a54] cursor-pointer' onClick={handleLogout}>Çıkış Yap</li>
            </ul>
          </div>
        )}
      </div>
      <div className='flex justify-between items-center h-[60px] p-2'>
        <input 
          type="text"
          placeholder='Search or start a new chat'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='rounded-lg bg-[#202d33] text-[#8796a1] text-sm font-light outline-none px-4 py-2 w-[400px] h-[35px] placeholder:text-[#8796a1] placeholder:text-sm placeholder:font-light'
        />
        <button 
          className={`text-2xl m-2 p-rounded-full ${filter ? "bg-emerald-500 text-white rounded-full hover:bg-emerald-700" : "text-[#8796a1] hover:bg-[#3c454c]"}`}
          onClick={() => setFilter(!filter)}
        >
          <BiFilter />
        </button>
      </div>
      <Chats filter={filter} searchText={searchText} onSelectChat={onSelectChat} />
    </div>
  );
}

export default LeftMenu;
