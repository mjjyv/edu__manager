import api from './api';

const trainingService = {
    // Khoa
    getKhoa: async () => (await api.get('/dao-tao/khoa')).data,
    saveKhoa: async (data) => (await api.post('/dao-tao/khoa', data)).data,
    deleteKhoa: async (id) => await api.delete(`/dao-tao/khoa/${id}`),

    // Chuyên ngành
    getNganh: async () => (await api.get('/dao-tao/chuyen-nganh')).data,
    saveNganh: async (data) => (await api.post('/dao-tao/chuyen-nganh', data)).data,
    deleteNganh: async (id) => await api.delete(`/dao-tao/chuyen-nganh/${id}`)
};

export default trainingService;