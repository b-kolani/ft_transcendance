import { MdArrowBack } from 'react-icons/md';

export default function EditProfile({onBack})
{
    return(
    <header className="flex justify-between items-center  w-full h-[60px] py-[8px] px-[12px]">
                <button type="button"
                        className='w-[28px] h-[28px] opacity-100 hover:opacity-70 border-1 transition-opacity duration-300'
                        onClick={onBack}        
                >
                    <MdArrowBack size={24} color="#FFFFFF" />
                </button>
                <div className='text-[#F0F0F0] text-[20px] font-semibold tracking-tight'>
                    Edit Profile
                </div>
    </header>
    );
}