import React, { useState, useEffect } from 'react';
import { Save, X, UserCog } from 'lucide-react';
import studentService from '../services/studentService';

const StudentEditModal = ({ show, onClose, student, onSuccess }) => {
    const [formData, setFormData] = useState({
        hoTen: '',
        ngaySinh: '',
        gioiTinh: 'Nam',
        maLop: ''
    });

    // Load dữ liệu sinh viên vào form khi mở Modal
    useEffect(() => {
        if (student) {
            setFormData({
                hoTen: student.hoTen,
                ngaySinh: student.ngaySinh,
                gioiTinh: student.gioiTinh,
                maLop: student.maLop
            });
        }
    }, [student]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await studentService.update(student.maSV, formData);
            alert('Cập nhật thông tin thành công!');
            onSuccess(); // Callback để refresh danh sách bên ngoài
            onClose();
        } catch (err) {
            alert('Lỗi cập nhật: ' + (err.response?.data?.message || 'Không xác định'));
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-lg w-full max-w-md shadow-xl overflow-hidden">
                <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <UserCog size={20} /> Chỉnh sửa Sinh viên
                    </h3>
                    <button onClick={onClose}><X size={20} /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mã Sinh viên</label>
                        <input value={student?.maSV || ''} disabled className="w-full bg-gray-100 border rounded p-2 text-gray-500 cursor-not-allowed" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                        <input name="hoTen" value={formData.hoTen} onChange={handleChange} required className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                            <input type="date" name="ngaySinh" value={formData.ngaySinh} onChange={handleChange} required className="w-full border rounded p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                            <select name="gioiTinh" value={formData.gioiTinh} onChange={handleChange} className="w-full border rounded p-2">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lớp Quản lý (Điều chuyển)</label>
                        <input name="maLop" value={formData.maLop} onChange={handleChange} required className="w-full border rounded p-2" />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-50">Hủy</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                            <Save size={18} /> Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentEditModal;