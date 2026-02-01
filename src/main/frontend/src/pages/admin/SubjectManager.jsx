import React, { useState, useEffect } from 'react';
import subjectService from '../../services/subjectService';
import { BookOpen, Plus, Edit, Trash2, Save, X } from 'lucide-react';

const SubjectManager = () => {
    const [subjects, setSubjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    
    const [formData, setFormData] = useState({
        maMH: '',
        tenMH: '',
        soTinChi: 3,
        maMonTienQuyet: [] // Array chứa mã các môn tiên quyết
    });

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = async () => {
        try {
            const data = await subjectService.getAll();
            setSubjects(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpenModal = (subject = null) => {
        if (subject) {
            setIsEdit(true);
            setFormData({
                maMH: subject.maMH,
                tenMH: subject.tenMH,
                soTinChi: subject.soTinChi,
                maMonTienQuyet: subject.maMonTienQuyet || []
            });
        } else {
            setIsEdit(false);
            setFormData({ maMH: '', tenMH: '', soTinChi: 3, maMonTienQuyet: [] });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await subjectService.update(formData.maMH, formData);
            } else {
                await subjectService.save(formData);
            }
            alert('Lưu thành công!');
            setShowModal(false);
            loadSubjects();
        } catch (err) {
            alert('Lỗi: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleDelete = async (maMH) => {
        if (window.confirm(`Bạn có chắc muốn xóa môn học ${maMH}?`)) {
            try {
                await subjectService.delete(maMH);
                loadSubjects();
            } catch (err) {
                alert('Không thể xóa môn học này (có thể đang có lớp học phần).');
            }
        }
    };

    // Xử lý chọn nhiều môn tiên quyết
    const handlePrereqChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({ ...formData, maMonTienQuyet: selectedOptions });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                    <BookOpen /> Quản lý Môn học
                </h2>
                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
                >
                    <Plus size={18} /> Thêm Môn học
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 uppercase text-sm font-semibold text-gray-700">
                        <tr>
                            <th className="p-4 border-b">Mã MH</th>
                            <th className="p-4 border-b">Tên Môn học</th>
                            <th className="p-4 border-b text-center">Số TC</th>
                            <th className="p-4 border-b">Môn Tiên quyết</th>
                            <th className="p-4 border-b text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(sub => (
                            <tr key={sub.maMH} className="hover:bg-gray-50 border-b">
                                <td className="p-4 font-bold text-blue-800">{sub.maMH}</td>
                                <td className="p-4">{sub.tenMH}</td>
                                <td className="p-4 text-center">{sub.soTinChi}</td>
                                <td className="p-4">
                                    {sub.maMonTienQuyet && sub.maMonTienQuyet.length > 0 ? (
                                        <div className="flex gap-1 flex-wrap">
                                            {sub.maMonTienQuyet.map(pq => (
                                                <span key={pq} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded border border-yellow-200">
                                                    {pq}
                                                </span>
                                            ))}
                                        </div>
                                    ) : <span className="text-gray-400 italic">Không có</span>}
                                </td>
                                <td className="p-4 text-center flex justify-center gap-2">
                                    <button onClick={() => handleOpenModal(sub)} className="text-blue-500 hover:bg-blue-50 p-2 rounded">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(sub.maMH)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Thêm/Sửa */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">{isEdit ? 'Cập nhật Môn học' : 'Thêm Môn học mới'}</h3>
                            <button onClick={() => setShowModal(false)}><X /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Mã môn học</label>
                                <input 
                                    value={formData.maMH} 
                                    onChange={(e) => setFormData({...formData, maMH: e.target.value})}
                                    disabled={isEdit} // Không sửa mã khi edit
                                    className={`w-full border rounded p-2 ${isEdit ? 'bg-gray-100' : ''}`}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tên môn học</label>
                                <input 
                                    value={formData.tenMH} 
                                    onChange={(e) => setFormData({...formData, tenMH: e.target.value})}
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Số tín chỉ</label>
                                <input 
                                    type="number"
                                    value={formData.soTinChi} 
                                    onChange={(e) => setFormData({...formData, soTinChi: e.target.value})}
                                    className="w-full border rounded p-2"
                                    min="1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Môn tiên quyết (Giữ Ctrl để chọn nhiều)</label>
                                <select 
                                    multiple 
                                    value={formData.maMonTienQuyet} 
                                    onChange={handlePrereqChange}
                                    className="w-full border rounded p-2 h-32"
                                >
                                    {subjects
                                        .filter(s => s.maMH !== formData.maMH) // Không chọn chính mình làm tiên quyết
                                        .map(s => (
                                            <option key={s.maMH} value={s.maMH}>
                                                {s.maMH} - {s.tenMH}
                                            </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Hủy</button>
                                <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded flex items-center gap-2">
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

export default SubjectManager;