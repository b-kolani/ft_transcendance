import Logo from '../../components/UI/Logo';
import Language from '../../components/UI/Languages';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
export default function Landing()
{
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/signUp');
    };
    return(
        <div className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center cursor-pointer" onClick={handleButtonClick}>
            <img
                src="/LPbackground.png"
                alt="background"
                className="absolute inset-0 h-full w-full object-cover -z-10"
            />
            {/* <Language /> */}
            <div className="flex flex-col items-center justify-center gap-4 h-full flex-1">
                <Logo variant='Landing'/>
                <p className='text-2xl md:text-3xl font-semibold text-amber-50 tracking-wide drop-shadow-lg animate-pulse'>
                    Click To Start Playing...
                </p>
            </div>
         </div>
    );
}
