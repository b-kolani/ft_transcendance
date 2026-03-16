import { useState } from 'react';
import ProfileDropdown from './ProfileDropdown'
import { MdArrowBack } from 'react-icons/md';
import Logo from '../../Assets/images/Logo.svg'

export default function ProfileHeader({isAdmin, userAvatar, handlleLogout, onBack})
{
    //DropDown state;
    const [isDropdownOpen, setisDropdownOpen] = useState(false);
    return(

        //This is for the search Bar !!
        
        <header className="flex justify-between items-center  w-full h-[60px] py-[8px] px-[12px] lg:h-[100px]">
            {!isAdmin && (
                <button
                    onClick={onBack}
                    className="flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-[#FFFFFF0A] transition-colors"
                    >
                    <MdArrowBack size={24} color="#FFFFFF" />
                </button>
            )}
            {isAdmin && <div className="w-[40px]"></div>}
            <div className='pt-[30px] lg:pt-[50px] text-[#F0F0F0] lg:text-[50px] text-[20px] font-semibold tracking-tight'>
                My Profile
            </div>
            {/* drop Down */}
            <div className='relative'>
                <button type='button'
                        className='relative cursor-pointer border-[#FFFFFF4D] border-[2px] rounded-full lg:w-[64px] lg:h-[64px] w-[36px] h-[36px] ease-in-out overflow-hidden '
                        onClick={() => setisDropdownOpen(prev => !prev)}
                >
                    <img src={userAvatar}
                            alt="the user avatar"
                            className='w-full h-full object-cover'
                    />
                </button>

                        {isDropdownOpen && (
                                <ProfileDropdown 
                                    isAdmin={isAdmin}
                                    handleLogout={handlleLogout}/>
                            )
                        }
            </div>
        </header>
    );
}