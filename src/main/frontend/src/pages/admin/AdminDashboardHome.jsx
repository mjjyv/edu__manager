import React from 'react';
import ClassListWidget from '../../components/dashboard/ClassListWidget';
import { BookOpen, Users, Award } from 'lucide-react'; // Import các icon trang trí

const AdminDashboardHome = () => {
    return (
        <div className="space-y-6">
            {/* Phần Thống kê nhanh (Placeholder) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-blue-100 mb-1">Học kỳ hiện tại</p>
                        <h3 className="text-2xl font-bold">HK1 - 2025</h3>
                    </div>
                    <BookOpen size={40} className="opacity-80"/>
                </div>
                {/* Các card thống kê khác... */}
            </div>

            {/* Danh sách Lớp Quản lý */}
            <ClassListWidget />
        </div>
    );
};

export default AdminDashboardHome;