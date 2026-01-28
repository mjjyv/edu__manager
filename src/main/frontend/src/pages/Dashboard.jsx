import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar cố định bên trái */}
            <Sidebar />

            {/* Khu vực hiển thị nội dung bên phải */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 bg-white border-b flex items-center px-8 justify-between sticky top-0 z-10">
                    <h3 className="text-slate-600 font-medium">Hệ thống Quản lý Đào tạo Đại học</h3>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        {/* <span className="text-sm text-slate-500">Môi trường: Linux Mint</span> */}
                    </div>
                </header>

                <div className="p-8">
                    {/* Outlet sẽ hiển thị nội dung của các Route con (như StudentManager) */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;