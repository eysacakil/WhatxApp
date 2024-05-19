import React from 'react';

export const ReceivedMessage = ({ message }) => (
  <div className="flex mb-4">
    <div className="bg-[#202d33] text-white p-2 rounded-lg">
      Hello! How can I help you today?
    </div>
  </div>
);

export const SentMessage = ({ message }) => (
  <div className="flex justify-end mb-4">
    <div className="bg-[#128c7e] text-white p-2 rounded-lg">
     Hello! How can I help you today?
    </div>
  </div>
);