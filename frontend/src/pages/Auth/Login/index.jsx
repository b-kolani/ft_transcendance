// import Logo from '../../components/UI/Logo';
// import LoginForm from './LoginForm';
// import RedirectionLine from '../../components/Auth/RedirectionLine';
// import SocialButton from '../../component/ui/SocialButton';
// import PrivacyPolicy from '../../component/ui/PrivacyPolicy';

import Logo from '../../../components/Auth/Logo';
import LoginForm from './Form';
import RedirectionLine from '../../../components/Auth/RedirectionLine'
import Google from '../../../components/Auth/Google'
import PrivacyPolicy from '../../../components/UI/PrivacyPolicy'
import Language from '../../../components/UI/Languages';
export default function Login({ isAdmin = false }){


    return(
        <div className='relative min-h-screen bg-[linear-gradient(to_bottom,#162D2A,#2F3A32,#3E2411)] flex justify-center items-center p-3 sm:p-4 md:p-6'>
            {/* <Language/> */}
            <div className='w-full sm:max-w-sm md:max-w-md bg-[#18181C]/100 space-y-6 sm:space-y-7 md:space-y-9 px-4 sm:px-5 md:px-6 py-6 sm:py-7 md:py-8 rounded-3xl sm:rounded-3xl md:rounded-4xl border-1 border-[#3D3229]'>
                <Logo/>
                <LoginForm isAdminLogin={isAdmin}/>
                <RedirectionLine text="new Here ?" link="/signUp" linkText="create new account"/>
                {/* <SocialButton/> */}
                <Google />
                <PrivacyPolicy/>
            </div>
        </div>
    );

}