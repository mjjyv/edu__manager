import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import adminClassService from '../../services/adminClassService';

const CreateClassModal = ({ show, onClose, onSuccess }) => {
    const [majors, setMajors] = useState([]);
    const [formData, setFormData] = useState({ maLop: '', tenLop: '', maNganh: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show) {
            setLoading(true); // Hiển thị trạng thái tải
            adminClassService.getAllMajors()
                .then(res => {
                    // Logic xử lý ưu tiên mảng trực tiếp
                    let finalData = [];

                    if (Array.isArray(res)) {
                        // Trường hợp 1: res chính là mảng
                        finalData = res;
                    } else if (res?.data && Array.isArray(res.data)) {
                        // Trường hợp 2: res là Axios object, dữ liệu nằm trong .data
                        finalData = res.data;
                    } else if (res?.content && Array.isArray(res.content)) {
                        // Trường hợp 3: res là Spring Page object
                        finalData = res.content;
                    } else {
                        console.warn("Dữ liệu không khớp định dạng mảng:", res);
                        // Fallback: Nếu không phải mảng, set rỗng để tránh crash map()
                        finalData = []; 
                    }

                    setMajors(finalData);
                })
                .catch(err => {
                    console.error("Lỗi API chuyên ngành:", err);
                    setMajors([]);
                })
                .finally(() => setLoading(false));
        }
    }, [show]);

    // ... Giữ nguyên phần handleSubmit và render form
    const handleSubmit = async (e) => {
        // ... (giữ nguyên code cũ)
        e.preventDefault();
        setLoading(true);
        try {
            await adminClassService.create(formData);
            alert('Thêm lớp thành công!');
            setFormData({ maLop: '', tenLop: '', maNganh: '' }); 
            onSuccess(); 
            onClose();
        } catch (err) {
            alert('Lỗi: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-xl font-bold text-gray-800">Thêm Lớp Quản lý</h3>
                    <button onClick={onClose}><X size={20} className="text-gray-500 hover:text-red-500" /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ... Giữ nguyên các input Mã Lớp, Tên Lớp ... */}
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mã Lớp (*)</label>
                        <input
                            required
                            placeholder="VD: CNTT01-K22"
                            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.maLop}
                            onChange={e => setFormData({ ...formData, maLop: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên Lớp (*)</label>
                        <input
                            required
                            placeholder="VD: Lớp Công nghệ phần mềm 1 - K22"
                            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.tenLop}
                            onChange={e => setFormData({ ...formData, tenLop: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên ngành (*)</label>
                        <select
                            required
                            className="w-full border rounded p-2 bg-white"
                            value={formData.maNganh}
                            onChange={e => setFormData({ ...formData, maNganh: e.target.value })}
                        >
                            <option value="">-- Chọn Chuyên ngành --</option>
                            {/* Render an toàn: Kiểm tra độ dài trước khi map */}
                            {majors && majors.length > 0 && majors.map(m => (
                                <option key={m.maNganh} value={m.maNganh}>
                                    {m.tenNganh} ({m.maNganh})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Hủy</button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="px-4 py-2 bg-uni-primary text-white rounded flex items-center gap-2 hover:bg-blue-800 disabled:opacity-50"
                        >
                            <Save size={18} /> {loading ? 'Đang lưu...' : 'Lưu dữ liệu'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateClassModal;