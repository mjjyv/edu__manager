import api from './api';

const majorService = {
    getAll: async () => {
        const response = await api.get('/chuyen-nganh'); // Gọi tới Controller vừa tạo
        return response.data;
    }
};

export default majorService;