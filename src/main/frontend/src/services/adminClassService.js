import api from './api';

const adminClassService = {
    getAll: async (page = 0, size = 10) => {
        const response = await api.get('/lop-quan-ly', { params: { page, size } });
        // Trả về response.data (chứa content, totalPages...)
        return response.data; 
    },
    create: async (classData) => {
        return api.post('/lop-quan-ly', classData);
    },
    getAllMajors: async () => {
        const response = await api.get('/chuyen-nganh');
        // QUAN TRỌNG: Trả về mảng dữ liệu trực tiếp
        return response.data; 
    }
};

export default adminClassService;