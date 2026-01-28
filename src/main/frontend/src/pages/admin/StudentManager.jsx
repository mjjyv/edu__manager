import React, { useState } from 'react';
import studentService from '../../services/studentService';
import { Search, Plus, User, Save, X, Trash2, AlertTriangle } from 'lucide-react';
import StudentDetailModal from '../../components/StudentDetailModal';
import { Eye } from 'lucide-react';

import { Edit } from 'lucide-react';
import StudentEditModal from '../../components/StudentEditModal';

const StudentManager = () => {
    // State quản lý dữ liệu
    const [students, setStudents] = useState([]);
    const [searchClass, setSearchClass] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');

    // State cho form thêm mới
    const [formData, setFormData] = useState({
        maSV: '',
        hoTen: '',
        ngaySinh: '',
        gioiTinh: 'Nam',
        maLop: ''
    });

    // State cho Modal Xóa
    const [deleteModal, setDeleteModal] = useState({ show: false, maSV: null, hoTen: '' });
    const [deleteReason, setDeleteReason] = useState('');

    // Hàm mở Modal xác nhận
    const confirmDelete = (sv) => {
        setDeleteModal({ show: true, maSV: sv.maSV, hoTen: sv.hoTen });
        setDeleteReason(''); // Reset lý do
    };

    // Hàm thực hiện xóa
    const handleDelete = async () => {
        if (!deleteReason.trim()) {
            alert("Vui lòng nhập lý do xóa!");
            return;
        }
        try {
            await studentService.softDelete(deleteModal.maSV, deleteReason);
            alert("Đã xóa sinh viên thành công.");
            setDeleteModal({ show: false, maSV: null, hoTen: '' });
            
            // Refresh danh sách hiện tại
            handleSearch({ preventDefault: () => {} }); 
        } catch (err) {
            alert("Lỗi khi xóa: " + (err.response?.data || err.message));
        }
    };

    const [detailModal, setDetailModal] = useState({ show: false, data: null });

    // Hàm gọi API lấy chi tiết
    const handleViewDetail = async (maSV) => {
        try {
            const data = await studentService.getDetail(maSV);
            setDetailModal({ show: true, data: data });
        } catch (err) {
            alert('Không thể tải thông tin chi tiết');
        }
    };

    const [editModal, setEditModal] = useState({ show: false, data: null });

    // Hàm mở form sửa
    const handleEdit = (sv) => {
        setEditModal({ show: true, data: sv });
    };

    // Xử lý tìm kiếm
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchClass) return;
        setLoading(true);
        setError('');
        try {
            const data = await studentService.getByClass(searchClass);
            setStudents(data);
            // Tự động điền mã lớp vào form thêm mới để tiện thao tác
            setFormData(prev => ({ ...prev, maLop: searchClass }));
        } catch (err) {
            setError('Không tìm thấy lớp hoặc có lỗi xảy ra.');
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    // Xử lý nhập liệu form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Xử lý thêm mới
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await studentService.create(formData);
            alert('Thêm sinh viên thành công!');
            setShowForm(false);
            // Refresh lại danh sách nếu đang xem đúng lớp đó
            if (searchClass === formData.maLop) {
                handleSearch(e);
            }
            // Reset form (giữ lại mã lớp)
            setFormData({
                maSV: '',
                hoTen: '',
                ngaySinh: '',
                gioiTinh: 'Nam',
                maLop: searchClass
            });
        } catch (err) {
            alert('Lỗi: ' + (err.response?.data?.message || 'Không thể thêm sinh viên'));
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                    <User /> Quản lý Sinh viên
                </h2>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
                >
                    {showForm ? <X size={18}/> : <Plus size={18}/>} 
                    {showForm ? 'Đóng' : 'Thêm Sinh viên'}
                </button>
            </div>

            {/* Thanh tìm kiếm */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Nhập mã lớp (VD: CNTT01-K21)..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={searchClass}
                        onChange={(e) => setSearchClass(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <Search size={18} /> Tìm kiếm
                    </button>
                </form>
                {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            </div>

            {/* Form thêm mới (Toggle) */}
            {showForm && (
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6 animate-fade-in">
                    <h3 className="font-semibold text-lg mb-4 text-blue-800">Thông tin sinh viên mới</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="maSV" value={formData.maSV} onChange={handleChange} placeholder="Mã Sinh viên" required className="p-2 border rounded" />
                        <input name="hoTen" value={formData.hoTen} onChange={handleChange} placeholder="Họ và tên" required className="p-2 border rounded" />
                        <input name="ngaySinh" type="date" value={formData.ngaySinh} onChange={handleChange} required className="p-2 border rounded" />
                        <select name="gioiTinh" value={formData.gioiTinh} onChange={handleChange} className="p-2 border rounded">
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                        <input name="maLop" value={formData.maLop} onChange={handleChange} placeholder="Mã lớp quản lý" required className="p-2 border rounded" />
                        
                        <div className="md:col-span-2 flex justify-end mt-2">
                            <button type="submit" className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-800 flex gap-2">
                                <Save size={18}/> Lưu hồ sơ
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Bảng danh sách */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
                        <tr>
                            <th className="p-4 border-b">Mã SV</th>
                            <th className="p-4 border-b">Họ tên</th>
                            <th className="p-4 border-b">Ngày sinh</th>
                            <th className="p-4 border-b">Giới tính</th>
                            <th className="p-4 border-b">Lớp</th>
                            <th className="p-4 border-b text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {loading ? (
                            <tr><td colSpan="5" className="p-4 text-center">Đang tải dữ liệu...</td></tr>
                        ) : students.length > 0 ? (
                            students.map((sv) => (
                                <tr key={sv.maSV} className="hover:bg-gray-50 border-b last:border-none">
                                    <td className="p-4 font-medium text-blue-800">{sv.maSV}</td>
                                    <td className="p-4">{sv.hoTen}</td>
                                    <td className="p-4">{sv.ngaySinh}</td>
                                    <td className="p-4">{sv.gioiTinh}</td>
                                    <td className="p-4"><span className="bg-gray-200 text-xs px-2 py-1 rounded">{sv.maLop}</span></td>
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => handleViewDetail(sv.maSV)}
                                            className="text-blue-500 hover:text-blue-700 p-2 rounded hover:bg-blue-50 transition"
                                            title="Xem chi tiết"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        {/* Nút Sửa (Mới) */}
                                        <button 
                                            onClick={() => handleEdit(sv)}
                                            className="text-orange-500 hover:text-orange-700 p-2 rounded hover:bg-orange-50 transition"
                                            title="Chỉnh sửa thông tin"
                                        >
                                            <Edit size={18} />
                                        </button>

                                        <button 
                                            onClick={() => confirmDelete(sv)}
                                            className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition"
                                            title="Xóa sinh viên"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="p-8 text-center text-gray-400">Chưa có dữ liệu hiển thị</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL XÁC NHẬN XÓA */}
            {deleteModal.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl transform transition-all scale-100">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <AlertTriangle size={32} />
                            <h3 className="text-xl font-bold">Xác nhận xóa sinh viên</h3>
                        </div>
                        
                        <p className="text-gray-600 mb-4">
                            Bạn có chắc chắn muốn xóa sinh viên <span className="font-bold text-black">{deleteModal.hoTen}</span> ({deleteModal.maSV})?
                            <br/>Hành động này sẽ ẩn sinh viên khỏi hệ thống.
                        </p>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lý do xóa (<span className="text-red-500">*</span>):</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 outline-none"
                                rows="3"
                                placeholder="Nhập lý do (VD: Thôi học, Chuyển trường...)"
                                value={deleteReason}
                                onChange={(e) => setDeleteReason(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setDeleteModal({ show: false, maSV: null, hoTen: '' })}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium"
                            >
                                Hủy bỏ
                            </button>
                            <button 
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium shadow-lg"
                            >
                                Xác nhận Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Đặt Modal ở cuối Component */}
            <StudentDetailModal 
                show={detailModal.show} 
                student={detailModal.data} 
                onClose={() => setDetailModal({ show: false, data: null })} 
            />
            
            {/* Modal Xóa cũ */}

            {/* Thêm Modal Edit vào cuối trang */}
            <StudentEditModal 
                show={editModal.show}
                student={editModal.data}
                onClose={() => setEditModal({ show: false, data: null })}
                onSuccess={() => handleSearch({ preventDefault: () => {} })} // Refresh lại list sau khi sửa xong
            />
        </div>
    );
};

export default StudentManager;