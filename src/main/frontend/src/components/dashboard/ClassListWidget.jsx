import React, { useEffect, useState, useCallback } from 'react';
import adminClassService from '../../services/adminClassService';
import CreateClassModal from './CreateClassModal';
import { Users, Plus } from 'lucide-react';

import Pagination from '../Pagination';

const ClassListWidget = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // State phân trang
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const pageSize = 5; // Số lượng hiển thị mỗi trang

    const fetchData = async (page) => {
    setLoading(true);
    try {
        const response = await adminClassService.getAll(page, pageSize);

        // Giải pháp an toàn: Kiểm tra nếu là mảng thì gán trực tiếp, nếu là Page thì lấy .content
        if (Array.isArray(response)) {
            setClasses(response);
            setTotalElements(response.length);
            setTotalPages(1); // Mảng trực tiếp không có thông tin tổng trang
            setCurrentPage(0);
        } else {
            // Trường hợp Spring Page chuẩn 
            setClasses(response?.content || []); 
            setTotalPages(response?.totalPages || 0);
            setTotalElements(response?.totalElements || 0);
            setCurrentPage(response?.number || 0);
        }
    } catch (error) {
        console.error("Lỗi tải danh sách lớp:", error);
        setClasses([]); 
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        fetchData(0); // Load trang đầu tiên khi mount
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchData(newPage);
        }
    };


    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">Danh sách Lớp Quản lý</h3>
                    <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">
                        Tổng: {totalElements} lớp
                    </span>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-uni-primary text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-800 transition shadow-sm"
                >
                    <Plus size={16} /> Thêm lớp
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-semibold">
                        <tr>
                            <th className="p-3 rounded-tl-lg">Mã Lớp</th>
                            <th className="p-3">Tên Lớp</th>
                            <th className="p-3">Khoa / Ngành</th>
                            <th className="p-3 text-center rounded-tr-lg">Sĩ số</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan="4" className="p-4 text-center text-gray-500">Đang tải...</td></tr>
                        ) : (classes && classes.length > 0) ? (
                            classes.map((lop) => (
                                <tr key={lop.maLop} className="hover:bg-gray-50 transition">
                                    <td className="p-3 font-medium text-uni-primary">{lop.maLop}</td>
                                    <td className="p-3 text-gray-700">{lop.tenLop}</td>
                                    <td className="p-3">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-800">{lop.tenKhoa}</span>
                                            <span className="text-xs text-gray-500">{lop.tenNganh}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex items-center justify-center gap-1 text-gray-600 bg-gray-100 px-2 py-1 rounded-full w-fit mx-auto">
                                            <Users size={14} />
                                            <span className="font-bold">{lop.siSo}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className="p-8 text-center text-gray-400">Không có dữ liệu lớp học nào</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Thanh phân trang */}
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />

            <CreateClassModal 
                show={showModal} 
                onClose={() => setShowModal(false)} 
                onSuccess={() => fetchData(0)} // Quay về trang đầu khi thêm mới
            />
        </div>
    );
};

export default ClassListWidget;