import React, { useEffect, useState } from 'react';
import LeftMenu from '../components//Home/LeftMenu';
import ChatDetails from '../components/Home/ChatDetails';
import LoadingScreen from '../components/Home/LoadingScreen';

function WhatxApp() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        const increment = Math.floor(Math.random() * 10 + 1) + 3;
        return Math.min(oldProgress + increment, 100);
      });
    }, 300); // Update every 300ms

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {loading ? (
        <LoadingScreen progress={progress} />
      ) : (
        <div className="w-screen h-screen overflow-hidden">
          {/* 2 components container */}
          <div className="flex justify-start whatsapp-bp:justify-center items-center bg-[#111a21] h-screen">
            {/* left menu */}
            <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-full h-full">
              <LeftMenu />
            </div>
            {/* chat details */}
            <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-full h-full">
              <ChatDetails />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WhatxApp;
