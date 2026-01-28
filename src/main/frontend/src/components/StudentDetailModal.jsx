import React from 'react';
import { X, User, BookOpen, Building, Calendar, AlertTriangle, GraduationCap } from 'lucide-react';

const StudentDetailModal = ({ show, onClose, student }) => {
    if (!show || !student) return null;

    const isDeleted = student.trangThai === 'DA_XOA';

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
                
                {/* Header */}
                <div className={`p-6 flex justify-between items-center ${isDeleted ? 'bg-red-50' : 'bg-blue-50'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${isDeleted ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            <User size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{student.hoTen}</h2>
                            <p className="text-sm text-gray-500 font-mono">{student.maSV}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Cột 1: Thông tin cá nhân */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Thông tin cá nhân</h3>
                        
                        <div className="flex items-center gap-3">
                            <Calendar className="text-gray-400" size={18} />
                            <div>
                                <p className="text-xs text-gray-400">Ngày sinh</p>
                                <p className="font-medium">{student.ngaySinh}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <User className="text-gray-400" size={18} />
                            <div>
                                <p className="text-xs text-gray-400">Giới tính</p>
                                <p className="font-medium">{student.gioiTinh}</p>
                            </div>
                        </div>
                        
                        {/* Trạng thái đặc biệt */}
                        {isDeleted && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center gap-2 text-red-600 font-bold mb-1">
                                    <AlertTriangle size={16} />
                                    <span>Đã thôi học/Xóa</span>
                                </div>
                                <p className="text-sm text-red-800">Lý do: {student.lyDoXoa}</p>
                                <p className="text-xs text-gray-500 mt-1">Ngày xóa: {new Date(student.ngayXoa).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>

                    {/* Cột 2: Thông tin đào tạo */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Thông tin đào tạo</h3>

                        <div className="flex items-center gap-3">
                            <Building className="text-uni-primary" size={18} />
                            <div>
                                <p className="text-xs text-gray-400">Lớp quản lý</p>
                                <p className="font-medium text-uni-primary">{student.tenLop}</p>
                                <p className="text-xs text-gray-500">({student.maLop})</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <BookOpen className="text-gray-400" size={18} />
                            <div>
                                <p className="text-xs text-gray-400">Chuyên ngành</p>
                                <p className="font-medium">{student.tenNganh}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Building className="text-gray-400" size={18} />
                            <div>
                                <p className="text-xs text-gray-400">Khoa trực thuộc</p>
                                <p className="font-medium">{student.tenKhoa}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t mt-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <GraduationCap size={20} />
                                    <span className="font-medium">GPA Tích lũy:</span>
                                </div>
                                <span className={`text-xl font-bold ${student.gpa >= 3.2 ? 'text-green-600' : 'text-orange-500'}`}>
                                    {student.gpa} / 4.0
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-4 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium shadow-sm"
                    >
                        Đóng lại
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentDetailModal;