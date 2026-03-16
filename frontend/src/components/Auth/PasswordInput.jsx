import ClosedEye from '../../Assets/images/closedEye.png';
import openEye from '../../Assets/images/openEye.png';
import { useState } from 'react';

export default function PasswordInput({htmlFor ,text, id, value, onChange, className})
{
    const [eyeButtun, setEyeButton] = useState(openEye);
    const [passwordType, setpasswordType] = useState('password');

    function    changeEye()

    {
        setEyeButton(eyeButtun == openEye ? ClosedEye : openEye);
        setpasswordType(eyeButtun == openEye ? 'text': 'password')
    }
    return (
        <div>
            <label htmlFor={htmlFor} className='block text-sm font-thin'>
                {text}
            </label>
            <div className='relative'>
                <input  id={id}
                        type={passwordType}
                        className={className}
                        value={value}
                        onChange={onChange}
                        required
                />
                <button
                    type="button"
                    onClick={changeEye}
                    className='absolute right-3 top-1/2 -translate-y-1/2'>
                        <img 
                            src={eyeButtun} 
                            alt="Toggle password visibility"
                            className="w-4 h-3"
                        />
                </button>
            </div>
        </div>
    );
}