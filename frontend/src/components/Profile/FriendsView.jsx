import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { MdMessage } from "react-icons/md";


export default function FriendsView({ onBack, Friends, onChat })
{
  return (
    <div className="flex flex-col w-full h-screen bg-[linear-gradient(to_bottom,#162D2A,#2F3A32,#3E2411)]">
        
        
        
        <header className="flex relative items-center px-[25px] py-[16px] border-b border-[#FFFFFF1A]">
            <button
                onClick={onBack}
                className="flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-[#FFFFFF0A] transition-colors"
                >
                <MdArrowBack size={24} color="#FFFFFF" />
            </button>
            <div className='absolute left-1/2 -translate-x-1/2 text-xl font-bold'>
                <h1 className="text-white text-[24px] font-semibold">Friends</h1>
            </div>
        </header>


        <main className='flex flex-col gap-2 px-4 py-4 overflow-y-auto'>
          {!Friends || Friends.length === 0 ? (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-[#B0B0B0] text-[18px]">No friends yet</p>
            </div>
          ) : (
            Friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-4 px-4 py-3 bg-[#1F2623] rounded-xl border border-[#FFFFFF1A] hover:border-[#FFFFFF26] transition-colors cursor-pointer"
              >
                <img
                  src={friend.avatar}
                  alt={friend.username}
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-white text-[16px] font-semibold">
                    {friend.username}
                  </p>
                  <p className="text-[#B0B0B0] text-[14px] capitalize">
                    {friend.status}
                  </p>
                </div>
                <button className='flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#2F3A32] hover:bg-[#3E2411] border border-[#FFFFFF1A] hover:border-[#FFFFFF4D] transition-all duration-200'
                        onClick={() => onChat((friend.id))}
                      >
                    <MdMessage size={24} className="text-white hover:text-[#FFFFFF] transition-colors"/>
                </button>
              </div>
            ))
          )}
        </main>
    </div>
    );
}
