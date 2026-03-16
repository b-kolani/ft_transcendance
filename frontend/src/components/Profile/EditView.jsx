import { MdArrowBack } from 'react-icons/md';
import { FaPen } from "react-icons/fa";

export default function EditView({Avatar, onBack, updatedData, setUpdatedData, onSave, onAvatarChange})
{

    return(
        <div className="flex flex-col items-center min-h-screen w-full bg-[linear-gradient(to_bottom,#162D2A,#2F3A32,#3E2411)]">
            {/* Header */}
            <header className="flex justify-between items-center w-full h-auto py-[12px] px-[16px] md:px-[30px]">
                <button
                    onClick={onBack}
                    className="flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-[#FFFFFF0A] transition-colors"
                >
                    <MdArrowBack size={24} color="#FFFFFF" />
                </button>
                <h1 className="text-white text-[18px] md:text-[20px] font-semibold">Edit Profile</h1>
                <div className="w-[40px]"></div>
            </header>

            {/* Avatar Section */}
            <div className="relative mt-[20px] md:mt-[40px]">
                <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden border-[2px] border-[#B6410F]">
                    <img 
                        src={Avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Edit Avatar Button */}
                <label className="absolute bottom-0 right-0 cursor-pointer flex bg-[#B6410F] items-center justify-center rounded-full border-[2px] border-[#3E2411] w-[40px] h-[40px] hover:bg-[#D4A574] transition-colors">
                    <FaPen className="text-white text-[16px]" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onAvatarChange}
                        className="hidden"
                    />
                </label>
            </div>

            {/* Form Container */}
            <div className="w-full max-w-[500px] px-[16px] md:px-[30px] py-[30px] md:py-[40px] flex flex-col gap-[20px] md:gap-[25px]">
                
                {/* Username */}
                <div className="flex flex-col gap-[8px]">
                    <label className="text-[14px] md:text-[16px] text-[#B0B0B0] font-semibold">
                        Username
                    </label>
                    <input
                        id='username'
                        type="text"
                        value={updatedData?.username || ""}
                        onChange={(e) => setUpdatedData({ ...updatedData, username: e.target.value })}
                        className="w-full text-white px-[14px] md:px-[16px] py-[12px] md:py-[14px] rounded-[10px] bg-[#1F2623] border-[1px] border-[#FFFFFF1A] focus:border-[#B6410F] focus:outline-none transition-colors text-[14px] md:text-[16px]"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-[8px]">
                    <label className="text-[14px] md:text-[16px] text-[#B0B0B0] font-semibold">
                        Email
                    </label>
                    <input
                        id='email'
                        type="email"
                        value={updatedData?.email || ""}
                        onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                        className="w-full text-white px-[14px] md:px-[16px] py-[12px] md:py-[14px] rounded-[10px] bg-[#1F2623] border-[1px] border-[#FFFFFF1A] focus:border-[#B6410F] focus:outline-none transition-colors text-[14px] md:text-[16px]"
                    />
                </div>

                {/* Current Password */}
                <div className="flex flex-col gap-[8px]">
                    <label className="text-[14px] md:text-[16px] text-[#B0B0B0] font-semibold">
                        Current Password
                    </label>
                    <input
                        id='password'
                        type="password"
                        value={updatedData?.currentPassword || ""}
                        onChange={(e) => setUpdatedData({ ...updatedData, currentPassword: e.target.value })}
                        className="w-full text-white px-[14px] md:px-[16px] py-[12px] md:py-[14px] rounded-[10px] bg-[#1F2623] border-[1px] border-[#FFFFFF1A] focus:border-[#B6410F] focus:outline-none transition-colors text-[14px] md:text-[16px]"
                    />
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-[8px]">
                    <label className="text-[14px] md:text-[16px] text-[#B0B0B0] font-semibold">
                        New Password
                    </label>
                    <input
                        type="password"
                        value={updatedData.password}
                        onChange={(e) => setUpdatedData({ ...updatedData, password: e.target.value })}
                        className="w-full text-white px-[14px] md:px-[16px] py-[12px] md:py-[14px] rounded-[10px] bg-[#1F2623] border-[1px] border-[#FFFFFF1A] focus:border-[#B6410F] focus:outline-none transition-colors text-[14px] md:text-[16px]"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-[12px] mt-[20px] md:mt-[30px]">
                    <button 
                        onClick={onSave}
                        className="flex-1 px-[16px] md:px-[20px] py-[12px] md:py-[14px] bg-gradient-to-r from-[#B6410F] to-[#D4A574] text-white font-semibold rounded-[10px] hover:from-[#D4A574] hover:to-[#E5C78A] active:scale-95 transition-all text-[14px] md:text-[16px]"
                    >
                        Save
                    </button>
                    <button 
                        onClick={onBack}
                        className="flex-1 px-[16px] md:px-[20px] py-[12px] md:py-[14px] bg-[#2F3A32] text-white font-semibold border-[1px] border-[#FFFFFF26] rounded-[10px] hover:border-[#B6410F] active:scale-95 transition-all text-[14px] md:text-[16px]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}