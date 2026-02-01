import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';
import { decodeToken } from '../utils/authUtils';


const LoginPage = () => {
    const [credentials, setCredentials] = useState({ tenDangNhap: '', matKhau: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Trong hàm handleLogin:
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/signin', credentials);
            const { accessToken } = response.data;

            localStorage.setItem('accessToken', accessToken);
            const decoded = decodeToken(accessToken);

            // Trích xuất Role đầu tiên từ mảng 'roles' và bỏ tiền tố 'ROLE_'
            const rawRole = decoded.roles && decoded.roles.length > 0 ? decoded.roles[0] : "SINH_VIEN";
            const formattedRole = rawRole.replace("ROLE_", ""); 

            const user = {
                tenDangNhap: decoded.sub,
                vaiTro: formattedRole // Kết quả: ADMIN, GIANG_VIEN, hoặc SINH_VIEN
            };

            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } catch (err) {
            setError('Tên đăng nhập hoặc mật khẩu không chính xác.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-blue-800">UNI-IT</h2>
                    <p className="text-gray-500 mt-2">Hệ thống Quản lý Đào tạo Đại học</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            name="tenDangNhap"
                            type="text"
                            placeholder="Mã sinh viên / Tên đăng nhập"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            name="matKhau"
                            type="password"
                            placeholder="Mật khẩu"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-800 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-md"
                    >
                        Đăng nhập
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Hỗ trợ kỹ thuật: it-support@uni.edu.vn</p>
                </div>
            </div>

            <div className='mt-5 flex flex-col'>
            Vào localhost:8080/api/auth/setup-samples để tạo dữ liệu mẫu (postman) <br /><br />
            NguoiDung("admin", password("admin123"), "ADMIN") <br /><br />

            NguoiDung("giangvien01", password("gv123"), "GIANG_VIEN") <br /><br />

            NguoiDung("20210001", password("sv123"), "SINH_VIEN")
            </div>
        </div>
    );
};

export default LoginPage;