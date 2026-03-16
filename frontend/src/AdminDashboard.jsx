import { API_BASE_URL } from './config';
import {useEffect, useState} from "react"
import {Link, useNavigate} from 'react-router-dom'
import Loading from './Loading';
function AdminDashboard()
{
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const getToken = localStorage.getItem("token");
        
        if(!getToken) {
            navigate("/login");
            return;
        }
        
        const checkAdmin = async () => {
            try {
                const resp = await fetch(`${API_BASE_URL}/users/me`, {
                    headers: { "Authorization": "Bearer " + getToken }
                });
                
                if (resp.ok) {
                    const data = await resp.json();
                    
                    if (data.role === "admin") {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                }
                
                setIsLoading(false);
                
            } catch(error) {
                // console.log("Error checking admin:", error);
                setIsLoading(false);
            }
        }
        
        checkAdmin();
        
    }, []);
    
    if (isLoading) {
        return <Loading />
    }
    
    if (!isAdmin) {
        return (
            <div className="bg-[#1F2623] border border-[#FFFFFF1A] rounded-[12px] p-[20px] text-center">
                <h1 className="text-[#D89F75] text-[20px] font-bold mb-[10px]">Access Denied</h1>
                <p className="text-[#B0B0B0]">You must be an admin to view this page.</p>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col gap-[20px]">
            <div className="bg-[#1F2623] border border-[#FFFFFF1A] rounded-[12px] p-[20px]">
                <h1 className='text-[#D4A574] text-center text-[24px] font-bold mb-[10px]'>Admin Dashboard</h1>
                <p className="text-[#B0B0B0] text-center mb-[20px]">Welcome, Admin! Manage your users and system settings below.</p>
                
                <div className="flex justify-center">
                    <Link to="/admin/users" className="w-full sm:w-auto">
                        <button className="w-full px-[24px] py-[10px] bg-[#B6410F] hover:bg-[#D4A574] text-white font-semibold rounded-[8px] transition-colors">
                            Manage Users
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;