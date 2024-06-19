import React from 'react';
import { emptyChatImage } from '../../assets/whatsapp';


const EmptyChat = () => {
    return (
        <div className="bg-gray-100 p-8 text-center h-full flex flex-col justify-center items-center">
            <div className="px-20">
                <img src={emptyChatImage} alt="empty" className="mt-24 w-96" />
                <h1 className="text-2xl font-light text-gray-700 mt-6">WhatsApp Web</h1>
                <p className="text-sm text-gray-500 font-normal mt-4">
                    Now send and receive messages without keeping your phone online.
                </p>
                <p className="text-sm text-gray-500 font-normal mt-2">
                    Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
                </p>
                <div className="border-t border-gray-300 my-10 opacity-40"></div>
            </div>
        </div>
    );
}

export default EmptyChat;
