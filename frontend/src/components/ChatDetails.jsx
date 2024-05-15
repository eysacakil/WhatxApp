import React, {useState, useEffect, useRef} from 'react';
import RoundedBtb from './Common/RoundedBtn';
import { MdSearch } from 'react-icons/md';
import { HiDotsVertical } from 'react-icons/hi';

function ChatDetails() {
  return (
    // Chatdetail main container
    <div className='flex flex-col h-screen'>
      {/* Contact nav */}
      <div className='flex justify-between bg-[#202d33] h-[60px] p-3'>
        {/* Contact info */}

        {/* Buttons */}
        <div className='flex justify-between item-center w-[85px]'>
          <RoundedBtb icon={<MdSearch />}/>
          <RoundedBtb icon={<HiDotsVertical />}/>
        </div>
      </div>

      {/* Messages section */}

      {/* Bottom section */}
    </div>
  )
}

export default ChatDetails