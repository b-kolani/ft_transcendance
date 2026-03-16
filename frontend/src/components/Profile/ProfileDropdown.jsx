import { RiDashboardHorizontalLine } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown({isAdmin, handleLogout})
{
    const navigate = useNavigate();

    return(
        <div className=' z-100 flex flex-col shadow-lg justify-center items-center absolute top-[100%] rounded-[12px] right-[50%] mt-[8px] bg-[#162D2A] w-[180px] border-[1px] border-[1px] border-[#FFFFFF26]'>

                                {!isAdmin ? (<button type="button" 
                                        onClick={() => navigate("/dashboard")}
                                        className=' flex gap-2 cursor-pointer w-full inline-flex items-center h-[48px] px-[22px] p-[12px] hover:bg-[#FFFFFF0A] transition-colors'
                                            >
                                    <RiDashboardHorizontalLine className="h-[20px] w-[20px] text-[#FFFFFF]"/>
                                    <p className='text-[#FFFFFF]'>
                                        Dashboard
                                    </p>
                                </button>): (
                                    <button type="button" 
                                        onClick={() => navigate("/admin/users")}
                                        className=' flex gap-2 cursor-pointer w-full inline-flex items-center h-[48px] px-[22px] p-[12px] hover:bg-[#FFFFFF0A] transition-colors'
                                            >
                                    <MdOutlineManageAccounts className="h-[20px] w-[20px] text-[#FFFFFF]"/>
                                    <p className='text-[#FFFFFF]'>
                                        Manage Users
                                    </p>
                                </button>) }


                                <div className="border-b-1 border-black w-2/3 "></div>

                                <button type="button"
                                        onClick={handleLogout}
                                        className='flex gap-2 cursor-pointer w-full inline-flex items-center h-[48px] px-[22px] py-[12px] hover:bg-[#FFFFFF0A] transition-colors'>

                                    <PiSignOutBold className='h-[20px] w-[20px] text-[#FFFFFF]'/>
                                    <p className='text-[16px] text-[#FFFFFF] '>
                                        Sign out
                                    </p>
                                </button>                              
                            </div>
    );
}