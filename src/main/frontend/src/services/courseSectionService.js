import api from './api';

const courseSectionService = {
    getAll: async (hocKy, namHoc) => {
        const params = { hocKy, namHoc };
        const response = await api.get('/lop-hoc-phan', { params });
        return response.data;
    },
    create: async (data) => {
        return api.post('/lop-hoc-phan', data);
    },
    delete: async (maLHP) => {
        return api.delete(`/lop-hoc-phan/${maLHP}`);
    }
};

export default courseSectionService;