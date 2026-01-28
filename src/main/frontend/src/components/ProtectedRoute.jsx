import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('accessToken');
    // Giả sử thông tin user được lưu sau khi đăng nhập thành công
    const user = JSON.parse(localStorage.getItem('user')); 

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.vaiTro)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;