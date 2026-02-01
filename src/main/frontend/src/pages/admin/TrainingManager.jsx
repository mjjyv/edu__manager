import React, { useState, useEffect } from 'react';
import trainingService from '../../services/trainingService';
import { Building, Book, Plus, Trash2, Save, X, RefreshCw } from 'lucide-react';

const TrainingManager = () => {
    const [activeTab, setActiveTab] = useState('KHOA'); // 'KHOA' | 'NGANH'
    const [listData, setListData] = useState([]);
    const [khoaList, setKhoaList] = useState([]); // Dùng cho dropdown
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({}); 

    useEffect(() => {
        // 1. Reset dữ liệu ngay khi chuyển tab để tránh hiển thị nhầm dữ liệu cũ
        setListData([]); 
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'KHOA') {
                const data = await trainingService.getKhoa();
                setListData(data);
                setKhoaList(data); // Cache lại danh sách khoa
            } else {
                // Đảm bảo luôn có danh sách khoa để hiển thị tên trong bảng Ngành
                if (khoaList.length === 0) {
                    const kData = await trainingService.getKhoa();
                    setKhoaList(kData);
                }
                const data = await trainingService.getNganh();
                setListData(data);
            }
        } catch (err) {
            console.error("Lỗi tải dữ liệu:", err);
            setListData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = () => {
        setFormData(activeTab === 'KHOA' 
            ? { maKhoa: '', tenKhoa: '', email: '', dienThoai: '' }
            : { maNganh: '', tenNganh: '', maKhoa: '' }
        );
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (activeTab === 'KHOA') {
                await trainingService.saveKhoa(formData);
            } else {
                await trainingService.saveChuyenNganh(formData);
            }
            alert('Lưu dữ liệu thành công!');
            setShowModal(false);
            loadData(); // Reload lại dữ liệu mới
        } catch (err) {
            alert('Lỗi: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`Bạn có chắc muốn xóa: ${id}?`)) return;
        try {
            if (activeTab === 'KHOA') await trainingService.deleteKhoa(id);
            else await trainingService.deleteNganh(id);
            alert('Xóa thành công!');
            loadData();
        } catch (err) {
            alert('Không thể xóa (Dữ liệu đang được sử dụng).');
        }
    };

    // Helper: Lấy tên khoa từ mã (dùng cho tab Ngành)
    const getTenKhoa = (maKhoa) => {
        const k = khoaList.find(item => item.maKhoa === maKhoa);
        return k ? k.tenKhoa : maKhoa;
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
                <Building /> Quản lý Đào tạo & Tổ chức
            </h2>

            {/* Tabs Navigation */}
            <div className="flex gap-4 border-b border-gray-200 mb-6">
                <button 
                    onClick={() => setActiveTab('KHOA')}
                    className={`pb-2 px-4 font-medium flex items-center gap-2 transition-colors ${
                        activeTab === 'KHOA' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'
                    }`}
                >
                    <Building size={18} /> Danh sách Khoa
                </button>
                <button 
                    onClick={() => setActiveTab('NGANH')}
                    className={`pb-2 px-4 font-medium flex items-center gap-2 transition-colors ${
                        activeTab === 'NGANH' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'
                    }`}
                >
                    <Book size={18} /> Chuyên Ngành
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500 italic">
                    {loading ? 'Đang đồng bộ dữ liệu...' : `Hiển thị ${listData.length} bản ghi`}
                </span>
                <button 
                    onClick={handleOpenModal} 
                    className="bg-blue-800 text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-blue-800 transition"
                >
                    <Plus size={18} /> Thêm {activeTab === 'KHOA' ? 'Khoa' : 'Ngành'} mới
                </button>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-lg shadow overflow-hidden min-h-75">
                {/* SỬ DỤNG KEY ĐỂ BUỘC RENDER LẠI TABLE KHI ĐỔI TAB */}
                <table key={activeTab} className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 uppercase text-xs font-bold text-gray-600">
                        <tr>
                            <th className="p-4 border-b">Mã {activeTab === 'KHOA' ? 'Khoa' : 'Ngành'}</th>
                            <th className="p-4 border-b">Tên {activeTab === 'KHOA' ? 'Khoa' : 'Ngành'}</th>
                            {activeTab === 'KHOA' ? (
                                <>
                                    <th className="p-4 border-b">Email Liên hệ</th>
                                    <th className="p-4 border-b">Điện thoại</th>
                                </>
                            ) : (
                                <th className="p-4 border-b">Khoa chủ quản</th>
                            )}
                            <th className="p-4 border-b text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">
                                    <div className="flex justify-center items-center gap-2">
                                        <RefreshCw className="animate-spin" size={20}/> Đang tải dữ liệu...
                                    </div>
                                </td>
                            </tr>
                        ) : listData.length === 0 ? (
                            <tr><td colSpan="5" className="p-6 text-center text-gray-400">Chưa có dữ liệu nào.</td></tr>
                        ) : (
                            listData.map((item) => (
                                <tr key={item.maKhoa || item.maNganh} className="hover:bg-gray-50 transition">
                                    <td className="p-4 font-bold text-blue-800">
                                        {item.maKhoa || item.maNganh}
                                    </td>
                                    <td className="p-4">
                                        {item.tenKhoa || item.tenNganh}
                                    </td>
                                    {activeTab === 'KHOA' ? (
                                        <>
                                            <td className="p-4 text-sm text-gray-600">{item.email}</td>
                                            <td className="p-4 text-sm text-gray-600">{item.dienThoai}</td>
                                        </>
                                    ) : (
                                        <td className="p-4">
                                            <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-100">
                                                {/* Hiển thị tên khoa từ API trả về hoặc từ danh sách cache */}
                                                {item.tenKhoa || getTenKhoa(item.maKhoa)}
                                            </span>
                                        </td>
                                    )}
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => handleDelete(item.maKhoa || item.maNganh)} 
                                            className="text-red-500 hover:bg-red-50 p-2 rounded transition"
                                            title="Xóa bản ghi"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL (Giữ nguyên logic cũ nhưng cập nhật UI một chút) */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-lg font-bold text-gray-800">
                                {activeTab === 'KHOA' ? 'Thêm Khoa Mới' : 'Thêm Chuyên Ngành'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500">
                                <X size={20}/>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {activeTab === 'KHOA' ? (
                                <>
                                    <div>
                                        <label className="text-sm font-medium">Mã Khoa (*)</label>
                                        <input required value={formData.maKhoa} onChange={e => setFormData({...formData, maKhoa: e.target.value})} className="w-full border p-2 rounded mt-1" placeholder="VD: CNTT" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Tên Khoa (*)</label>
                                        <input required value={formData.tenKhoa} onChange={e => setFormData({...formData, tenKhoa: e.target.value})} className="w-full border p-2 rounded mt-1" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Email</label>
                                        <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border p-2 rounded mt-1" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Điện thoại</label>
                                        <input value={formData.dienThoai} onChange={e => setFormData({...formData, dienThoai: e.target.value})} className="w-full border p-2 rounded mt-1" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="text-sm font-medium">Khoa chủ quản (*)</label>
                                        <select required value={formData.maKhoa} onChange={e => setFormData({...formData, maKhoa: e.target.value})} className="w-full border p-2 rounded mt-1 bg-white">
                                            <option value="">-- Chọn Khoa --</option>
                                            {khoaList.map(k => <option key={k.maKhoa} value={k.maKhoa}>{k.tenKhoa}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Mã Ngành (*)</label>
                                        <input required value={formData.maNganh} onChange={e => setFormData({...formData, maNganh: e.target.value})} className="w-full border p-2 rounded mt-1" placeholder="VD: KTPM" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Tên Ngành (*)</label>
                                        <input required value={formData.tenNganh} onChange={e => setFormData({...formData, tenNganh: e.target.value})} className="w-full border p-2 rounded mt-1" />
                                    </div>
                                </>
                            )}
                            
                            <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">Hủy</button>
                                <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded flex items-center gap-2 hover:bg-blue-800">
                                    <Save size={18} /> Lưu dữ liệu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainingManager;