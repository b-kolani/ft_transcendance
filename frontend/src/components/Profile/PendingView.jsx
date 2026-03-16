import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { MdCheck, MdClose } from "react-icons/md";

function PendingView({ onBack, pendingReqs, Accept }) {
  return (
  
    <div className="w-full h-screen bg-[linear-gradient(to_bottom,#162D2A,#2F3A32,#3E2411)] flex flex-col">
        <header className="flex relative items-center px-[25px] py-[16px] border-b border-[#FFFFFF1A]">
            <button
                onClick={onBack}
                className="flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-[#FFFFFF0A] transition-colors"
                >
                <MdArrowBack size={24} color="#FFFFFF" />
            </button>
            <div className='absolute left-1/2 -translate-x-1/2 text-xl font-bold'>
                <h1 className="text-white text-[20px] font-semibold">Pending Requests</h1>
            </div>
        </header>
      <main className='flex flex-col gap-2 px-4 py-4 overflow-y-auto'>
        {!pendingReqs || pendingReqs.length === 0 ? (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-[#B0B0B0] text-[18px]">No pending requests</p>
          </div>
        ) : (
          pendingReqs.map((request) => (
            <div
              key={request.id}
              className="flex items-center gap-4 px-4 py-3 bg-[#1F2623] rounded-xl border border-[#FFFFFF1A] hover:border-[#FFFFFF26] transition-colors"
            >
              <img
                src={request.avatar}
                alt={request.username}
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-white text-[16px] font-semibold">
                  {request.username}
                </p>
                <p className="text-[#B0B0B0] text-[14px] capitalize">
                  {request.status}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={Accept(request.id)}
                        className='flex items-center justify-center w-[40px] h-[40px] rounded-full bg-green-600/20 hover:bg-green-600/40 border border-green-500/30 hover:border-green-500/60 transition-all duration-200'>
                  <MdCheck size={24} className="text-green-500"/>
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default PendingView;
