import { MdArrowBack } from "react-icons/md";

import { FaPen } from "react-icons/fa";

export default function EditProfileButton({onBack})
{
    return(
        <button className="rounded-4xl border-[#FFFFFF1A] linear-gradient(135deg, #4A6B63, #5C4620) border-[1px] w-[180px] h-[48px] px-[24px] py-[10px] flex items-center gap-[16px]
                            active:scale-[0.98] active:opacity-90 active:border-[1.5px] active:border-[#4A6B63] transition-all duration-200">
            {/* pen edit */}
                <FaPen className='h-[18px] w-[18px] text-[#FFFFFF]'/>
                <p className="cursor-pointer text-white tracking-[0.5px] font-semibold">Edit Profile</p>
        </button>
    );
}