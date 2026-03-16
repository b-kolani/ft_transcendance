import React from 'react';

function TabButtons({ onSelectView }) {
  return (
    <div className="flex gap-10 px-[20px] pt-[24px] pb-[24px] w-full justify-center">
      <button
            onClick={() => onSelectView("friends")}
            className="px-[16px] py-[12px] bg-gradient-to-r from-[#2F3A32] to-[#3E2411] border-b-[3px] border-[#FFFFFF26] rounded-[12px] text-white font-semibold text-[14px] hover:border-[#FFFFFF4D] transition-all duration-200 active:scale-95"
      >
        Friends
      </button>

      {/* Pending Requests Button */}
      <button
        onClick={() => onSelectView("pending")}
        className="px-[16px] py-[12px] bg-gradient-to-r from-[#2F3A32] to-[#3E2411] border-b-[3px] border-[#FFFFFF26] rounded-[12px] text-white font-semibold text-[16px] hover:border-[#FFFFFF4D] transition-all duration-200 active:scale-95"
      >
        Requests
      </button>
    <button
        onClick={() => onSelectView("statistics")}
        className="px-[16px] py-[12px] bg-gradient-to-r from-[#2F3A32] to-[#3E2411] border-b-[3px] border-[#FFFFFF26] rounded-[12px] text-white font-semibold text-[16px] hover:border-[#FFFFFF4D] transition-all duration-200 active:scale-95"
      >
        Statistics
      </button>
    </div>
  );
}

export default TabButtons;
