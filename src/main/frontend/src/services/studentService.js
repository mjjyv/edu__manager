import api from './api';

const studentService = {
    // Tra cứu sinh viên theo mã lớp
    getByClass: async (maLop) => {
        const response = await api.get(`/sinh-vien/lop/${maLop}`);
        return response.data;
    },

    // Thêm mới sinh viên
    create: async (studentData) => {
        const response = await api.post('/sinh-vien', studentData);
        return response.data;
    },

    // Thêm hàm xóa mềm
    softDelete: async (maSV, lyDo) => {
        const response = await api.put(`/sinh-vien/${maSV}/soft-delete`, { lyDo });
        return response.data;
    },

    // Lấy chi tiết sinh viên
    getDetail: async (maSV) => {
        const response = await api.get(`/sinh-vien/${maSV}/detail`);
        return response.data;
    },

    // Cập nhật thông tin sinh viên
    update: async (maSV, studentData) => {
        const response = await api.put(`/sinh-vien/${maSV}`, studentData);
        return response.data;
    }
};

export default studentService;