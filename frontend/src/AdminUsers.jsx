import { API_BASE_URL } from './config';
import {useEffect, useState} from "react"
import {Link, useNavigate} from 'react-router-dom'
import Loading from './Loading';
import { MdOutlineCancel } from 'react-icons/md';

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 
    
const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    setError(null);
    
    try {
        const resp = await fetch(`${API_BASE_URL}/users/admin/users`, {
            headers: { "Authorization": "Bearer " + token }
        });
        
        if (resp.ok) {
            const data = await resp.json();
            setUsers(data);
        } else if (resp.status === 403) {
            setError("Access denied. Admin privileges required.");
            navigate("/profile");
        } else {
            setError("Failed to fetch users");
        }
    } catch(error) {
        // console.log("Error:", error);
        setError("Network error. Please try again.");
    } finally {
        setIsLoading(false);
    }
}
    
    useEffect(() => {
        fetchUsers();
    }, []);
    
    const handleDelete = async (userId, username) => {
    const confirmed = window.confirm(
        `⚠️ DELETE USER: ${username}\n\n` +
        `This action will:\n` +
        `• Remove the user from the database\n` +
        `• Delete all their friend connections\n` +
        `• This action CANNOT be undone\n\n` +
        `Are you absolutely sure?`
    );
    if (!confirmed) return;
    
    const token = localStorage.getItem("token");
    setIsLoading(true);
    
    try {
        const resp = await fetch(`${API_BASE_URL}/users/users/${userId}`, {
            method: "DELETE",
            headers: { "Authorization": "Bearer " + token }
        });

        if (resp.ok) {
            setUsers(users.filter(u => u.id !== userId));
            alert(`✅ User "${username}" deleted successfully!`);
        } else {
            const data = await resp.json();
            alert(`❌ Failed to delete user: ${data.error || data.message || "Unknown error"}`);
        }
    } catch(error) {
        // console.log("Error:", error);
        alert("❌ Network error. Please try again.");
    } finally {
        setIsLoading(false);
    }
}
    const startEdit = (user) => {
        setEditingUser(user);
    }
    
    const closeEdit = () => {
        setEditingUser(null);
        fetchUsers();
    }
    
    return (
        <div className='min-h-screen bg-[linear-gradient(to_bottom,#162D2A,#2F3A32,#3E2411)] text-white p-[20px] md:p-[40px]'>
            <div className='max-w-6xl mx-auto flex flex-col gap-[30px]'>
                {/* Header */}
                <div className='flex justify-between items-center'>
                    <h1 className='text-[#D4A574] text-[28px] md:text-[36px] font-bold'>Manage Users</h1>
                    <Link to="/profile">
                        <button className='px-[16px] py-[8px] bg-[#4A3B2F] hover:bg-[#3A2B1F] text-[#D4A574] font-semibold rounded-[8px] border border-[#D4A574] transition-colors'>
                            Back to Profile
                        </button>
                    </Link>
                </div>

                {isLoading && <Loading />}
                {error && <div className='bg-red-900 border-l-4 border-red-600 text-red-100 p-[15px] rounded-lg'>{error}</div>}
                
                {!isLoading && !error && (
                    <div>
                        <h2 className='text-white text-[20px] font-semibold mb-[20px]'>All Users ({users.length})</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]'>
                            {users.map(user => (
                                <div key={user.id} className='bg-[#1F2623] border border-[#FFFFFF1A] rounded-[12px] p-[15px] hover:border-[#B6410F] transition-colors'>
                                    <div className='flex items-center gap-[12px] mb-[12px]'>
                                        <img 
                                            src={`https://localhost:8443${user.avatar}`} 
                                            alt={user.username}
                                            className='w-[50px] h-[50px] rounded-full object-cover border-2 border-[#B6410F]'
                                        />
                                        <div className='flex-1'>
                                            <p className='text-white font-semibold'>{user.username}</p>
                                            <p className='text-[#B0B0B0] text-xs'>{user.email}</p>
                                        </div>
                                    </div>
                                    
                                    <div className='text-sm text-[#B0B0B0] mb-[12px]'>
                                        <p><span className='text-[#D4A574]'>Role:</span> {user.role}</p>
                                        <p><span className='text-[#D4A574]'>Status:</span> {user.isOnline ? <span className='text-green-400'>🟢 Online</span> : <span className='text-red-400'>🔴 Offline</span>}</p>
                                    </div>
                                    
                                    <div className='flex gap-[8px]'>
                                        <button 
                                            onClick={() => startEdit(user)}
                                            className='flex-1 px-[10px] py-[6px] bg-[#B6410F] hover:bg-[#D4A574] text-white font-semibold rounded-[6px] text-xs transition-colors'
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user.id, user.username)}
                                            className='flex-1 px-[10px] py-[6px] bg-red-600 hover:bg-red-700 text-white font-semibold rounded-[6px] text-xs transition-colors'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {editingUser && (
                    <EditForm 
                        user={editingUser} 
                        onClose={closeEdit}
                    />
                )}
            </div>
        </div>
    )
}

function EditForm({ user, onClose }) {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    
    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        
        try {
            const resp = await fetch(`${API_BASE_URL}/users/admin/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    username, 
                    email, 
                    role
                })
            });
            
            if (resp.ok) {
                alert("User updated successfully!");
                onClose();
            } else {
                const data = await resp.json();
                alert("Failed: " + (data.error || data.message || "Error"));
            }
        } catch(error) {
            console.log("Error:", error);
            alert("Error updating user");
        }
    }
    
    return (
        <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            border: "2px solid black",
            padding: "20px",
            zIndex: 1000
        }}>
            <h2>Edit User: {user.username}</h2>
            
            <div>
                <label>Username:</label>
                <input 
                    type="text"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            
            <div>
                <label>Email:</label>
                <input 
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div>
                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                     <option value="admin">Admin</option>
                </select>
            </div>
            
            <button onClick={handleSubmit}>Save Changes</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
}

export default AdminUsers;