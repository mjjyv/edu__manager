import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MENU_ITEMS } from '../config/menuConfig';
import { LogOut } from 'lucide-react';

const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = user.vaiTro || 'SINH_VIEN';
    const menu = MENU_ITEMS[role] || [];
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col shadow-xl">
            <div className="p-6 border-b border-slate-800">
                <h2 className="text-2xl font-bold text-blue-400 italic">UNI-IT</h2>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Management System</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menu.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) => 
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.title}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800/50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-semibold truncate">{user.tenDangNhap}</p>
                    <p className="text-[10px] text-blue-400 uppercase font-bold">{role}</p>
                </div>
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;