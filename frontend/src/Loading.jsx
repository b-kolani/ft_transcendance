
import Logo from '../src/Assets/images/Logo.svg'


export default function Loading()
{
    return(
    <div className="flex w-full pb-35 items-center justify-center h-screen bg-[linear-gradient(to_bottom,#162D2A,#2F3A32,#545748,#DB9F75,#804012,#3E2411)]">
        <img src={Logo} alt="" className='animate-pulse animate-ease-linear w-45 h-45 md:w-80 md:h-80'/>
    </div>
    );
}