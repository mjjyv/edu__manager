import React, { useState, useEffect } from 'react';
import courseSectionService from '../../services/courseSectionService';
import subjectService from '../../services/subjectService';
import api from '../../services/api'; // Dùng tạm để gọi giảng viên nếu chưa có service riêng
import { Calendar, Plus, Trash2, Save, X, Filter } from 'lucide-react';

const ClassManager = () => {
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [lecturers, setLecturers] = useState([]); // Danh sách giảng viên
    const [showModal, setShowModal] = useState(false);
    
    // Filter State
    const [filter, setFilter] = useState({ hocKy: '1', namHoc: '2025-2026' });

    // Form State
    const [formData, setFormData] = useState({
        maLHP: '', maMH: '', maGV: '', hocKy: '1', namHoc: '2025-2026', siSoToiDa: 50
    });

    useEffect(() => {
        loadInitialData();
        loadClasses();
    }, [filter]); // Reload khi đổi bộ lọc

    const loadInitialData = async () => {
        try {
            // Load danh mục môn học và giảng viên để chọn
            const subData = await subjectService.getAll();
            setSubjects(subData);
            
            // Giả sử có API lấy danh sách giảng viên
            // const lecData = await lecturerService.getAll(); 
            // setLecturers(lecData);
            // Mock data tạm thời nếu chưa có API Giảng viên:
            setLecturers([
                { maGV: 'GV001', hoTen: 'Nguyễn Văn A' },
                { maGV: 'GV002', hoTen: 'Trần Thị B' }
            ]);
        } catch (err) {
            console.error(err);
        }
    };

    const loadClasses = async () => {
        try {
            const data = await courseSectionService.getAll(filter.hocKy, filter.namHoc);
            setClasses(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            // Tự động sinh mã LHP nếu người dùng chưa nhập: MH + Kỳ + Năm (Ví dụ đơn giản)
            const payload = { ...formData };
            if (!payload.maLHP) {
                payload.maLHP = `LHP_${payload.maMH}_${payload.hocKy}_${Date.now().toString().slice(-4)}`;
            }

            await courseSectionService.create(payload);
            alert('Mở lớp thành công!');
            setShowModal(false);
            loadClasses();
        } catch (err) {
            alert('Lỗi: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleDelete = async (maLHP) => {
        if (window.confirm(`Xóa lớp ${maLHP}?`)) {
            try {
                await courseSectionService.delete(maLHP);
                loadClasses();
            } catch (err) {
                alert('Không thể xóa lớp (đã có sinh viên đăng ký).');
            }
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                    <Calendar /> Quản lý Lớp Học Phần
                </h2>
                
                <div className="flex gap-2 bg-white p-2 rounded shadow">
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-gray-500"/>
                        <select 
                            value={filter.hocKy}
                            onChange={e => setFilter({...filter, hocKy: e.target.value})}
                            className="border rounded p-1"
                        >
                            <option value="1">Học kỳ 1</option>
                            <option value="2">Học kỳ 2</option>
                            <option value="3">Học kỳ Hè</option>
                        </select>
                        <select 
                            value={filter.namHoc}
                            onChange={e => setFilter({...filter, namHoc: e.target.value})}
                            className="border rounded p-1"
                        >
                            <option value="2024-2025">2024-2025</option>
                            <option value="2025-2026">2025-2026</option>
                        </select>
                    </div>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="bg-blue-800 text-white px-4 py-1 rounded flex items-center gap-2 hover:bg-blue-800"
                    >
                        <Plus size={16} /> Mở Lớp Mới
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 uppercase text-xs font-bold text-gray-600">
                        <tr>
                            <th className="p-4 border-b">Mã Lớp</th>
                            <th className="p-4 border-b">Môn Học</th>
                            <th className="p-4 border-b">Giảng Viên</th>
                            <th className="p-4 border-b text-center">Sĩ số</th>
                            <th className="p-4 border-b text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.length > 0 ? classes.map(cls => (
                            <tr key={cls.maLHP} className="hover:bg-gray-50 border-b">
                                <td className="p-4 font-bold text-blue-600">{cls.maLHP}</td>
                                <td className="p-4">
                                    <p className="font-semibold">{cls.tenMH}</p>
                                    <p className="text-xs text-gray-500">{cls.maMH}</p>
                                </td>
                                <td className="p-4">{cls.tenGV}</td>
                                <td className="p-4 text-center">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                                        Max: {cls.siSoToiDa}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button onClick={() => handleDelete(cls.maLHP)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" className="p-6 text-center text-gray-400">Không có lớp nào trong kỳ này</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Mở Lớp */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-xl font-bold text-gray-800">Mở Lớp Học Phần Mới</h3>
                            <button onClick={() => setShowModal(false)}><X /></button>
                        </div>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold">Học kỳ</label>
                                    <input value={formData.hocKy} disabled className="w-full bg-gray-100 border rounded p-2" />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold">Năm học</label>
                                    <input value={formData.namHoc} disabled className="w-full bg-gray-100 border rounded p-2" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1 block">Môn học (*)</label>
                                <select 
                                    className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
                                    value={formData.maMH}
                                    onChange={e => setFormData({...formData, maMH: e.target.value})}
                                    required
                                >
                                    <option value="">-- Chọn Môn học --</option>
                                    {subjects.map(sub => (
                                        <option key={sub.maMH} value={sub.maMH}>{sub.maMH} - {sub.tenMH} ({sub.soTinChi} TC)</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1 block">Giảng viên (*)</label>
                                <select 
                                    className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
                                    value={formData.maGV}
                                    onChange={e => setFormData({...formData, maGV: e.target.value})}
                                    required
                                >
                                    <option value="">-- Chọn Giảng viên --</option>
                                    {lecturers.map(gv => (
                                        <option key={gv.maGV} value={gv.maGV}>{gv.hoTen}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1 block">Mã Lớp (Tùy chọn - Tự sinh nếu để trống)</label>
                                <input 
                                    className="w-full border rounded p-2"
                                    placeholder="VD: LHP_JAVA_01"
                                    value={formData.maLHP}
                                    onChange={e => setFormData({...formData, maLHP: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1 block">Sĩ số tối đa</label>
                                <input 
                                    type="number"
                                    className="w-full border rounded p-2"
                                    value={formData.siSoToiDa}
                                    onChange={e => setFormData({...formData, siSoToiDa: parseInt(e.target.value)})}
                                    min="10"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">Hủy</button>
                                <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded flex items-center gap-2 hover:bg-blue-800">
                                    <Save size={18} /> Lưu & Mở Lớp
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassManager;