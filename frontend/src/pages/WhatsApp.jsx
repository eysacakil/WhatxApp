import React from 'react'
import LeftMenu from '../components/LeftMenu'
import ChatDetails from '../components/ChatDetails'

// TODO : Loading screen component

function WhatxApp() {
  return (
    // main container
    <div className="w-screen h-screen overflow-hidden">
        {/* 2 components container */}
        <div className='flex justify-start whatsapp-bp:justify-center items-center bg-[#111a21] h-screen'>
            {/* left menu */}
            <div className='bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100'>
              <LeftMenu />
            </div>
            {/* chat details */}
            <div className='bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100'>
              <ChatDetails />
            </div>

        </div>
    </div>
  )
}

export default WhatxApp