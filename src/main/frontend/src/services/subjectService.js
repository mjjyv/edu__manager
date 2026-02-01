import api from './api';

const subjectService = {
    getAll: async () => {
        const response = await api.get('/mon-hoc');
        return response.data;
    },
    save: async (subjectData) => {
        // Nếu đã tồn tại (logic xử lý ở UI) thì gọi PUT, ngược lại POST
        // Ở đây giả sử UI sẽ gọi đúng hàm
        return api.post('/mon-hoc', subjectData);
    },
    update: async (maMH, subjectData) => {
        return api.put(`/mon-hoc/${maMH}`, subjectData);
    },
    delete: async (maMH) => {
        return api.delete(`/mon-hoc/${maMH}`);
    }
};

export default subjectService;