import { MdSearch } from 'react-icons/md';
import { IoSearch } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

export default function SearchBar({ 
  query, 
  setQuery, 
  handleSearch,
  searchReqs = []
}) {
  return (
    <div className="flex items-center text-[#7a9990] border-b-2 border-white/40 w-[70%] focus:border-b-[#4ecdc4] mx-auto px-[4px] py-[12px] gap-2">
        <IoSearch size={25}/>
        <input
            type="text"
            value={query}
            placeholder='Search users...'
            className='flex-1 text-[#7a9990] border-none outline-none focus:outline-none focus:ring-0 focus:text-[#4ecdc4]/100'
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
        <button 
          onClick={handleSearch}
          className="flex items-center justify-center hover:text-[#4ecdc4] transition-colors"
        >
          <FaArrowRightLong size={20}/>
        </button>


      {/* Search Input Section
      <div className="flex gap-[10px] mb-[10px]">
        <div className="flex-1 flex items-center bg-[#1F2623] border-[1px] border-[#FFFFFF26] rounded-[12px] px-[12px]">
          <MdSearch className="h-[20px] w-[20px] text-[#B0B0B0]" />
          <input
            type="text"
            placeholder="Search users by username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 ml-[8px] py-[12px] bg-transparent text-[#FFFFFF] placeholder-[#B0B0B0] focus:outline-none"
          />
        </div>
        <button 
          onClick={handleSearch}
          className="px-[20px] py-[12px] bg-gradient-to-r from-[#2F3A32] to-[#3E2411] border-[1px] border-[#FFFFFF26] rounded-[12px] text-[#FFFFFF] font-medium hover:border-[#FFFFFF4D] transition-all duration-200"
        >
          Search
        </button>
      </div>
      {searchReqs.length > 0 && (
        <div className="mt-[10px]">
          <h4 className="text-[#FFFFFF] text-[14px] font-medium mb-[8px]">Search Results:</h4>
          <div className="space-y-[8px]">
            {searchReqs.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-[10px] px-[12px] py-[8px] border-[1px] border-[#FFFFFF1A] rounded-[8px] bg-[#1F2623] hover:bg-[#2A3530] transition-colors"
              >
                <img
                  src={`https://localhost:8443${user.avatar}`}
                  width="30"
                  height="30"
                  className="rounded-full object-cover"
                  alt={user.username}
                />
                <span className="flex-1 text-[#FFFFFF] text-[14px]">{user.username}</span>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('addFriend', { detail: user.id }))}
                  className="px-[12px] py-[6px] bg-gradient-to-r from-[#2F3A32] to-[#3E2411] border-[1px] border-[#FFFFFF26] rounded-[6px] text-[#FFFFFF] text-[12px] font-medium hover:border-[#FFFFFF4D] transition-all"
                >
                  Add Friend
                </button>
              </div>
            ))}
          </div>
        </div>
      )}*/}
    </div> 
  );
}