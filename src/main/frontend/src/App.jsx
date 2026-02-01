import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import StudentManager from './pages/admin/StudentManager';
import SubjectManager from './pages/admin/SubjectManager';
import ClassManager from './pages/admin/ClassManager';
import AdminDashboardHome from './pages/admin/AdminDashboardHome';
import TrainingManager from './pages/admin/TrainingManager';


// Các component Placeholder (XYZ) cho Giai đoạn 5.2
const Unauthorized = () => <div className="p-8 text-center">Bạn không có quyền truy cập chức năng này.</div>;
const StudentModule = () => <div className="p-8">Module Đăng ký & Xem điểm Sinh viên</div>;
const TeacherModule = () => <div className="p-8">Module Nhập điểm Giảng viên</div>;
const AdminModule = () => (
  <Routes>
     <Route path="sinh-vien" element={<StudentManager />} />
     {/* Có thể mở rộng thêm: <Route path="mon-hoc" element={<MonHocManager />} /> */}
     <Route path="/" element={<div className="p-8">Chào mừng Quản trị viên. Hãy chọn chức năng từ menu.</div>} />
  </Routes>
);



const DashboardHome = () => {
  // Lấy thông tin user/role từ localStorage (giả định đã lưu khi login thành công)
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.vaiTro;


  if (role === 'ADMIN') return <AdminDashboardHome />;
  return <div className="p-8">Chào mừng bạn quay lại hệ thống.</div>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Nhóm Route dùng chung giao diện Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'GIANG_VIEN', 'SINH_VIEN']} />}>
          <Route path="/" element={<Dashboard />}>
            {/* Trang chủ động dựa trên vai trò */}
            <Route index element={<DashboardHome />} />

            {/* Admin sub-routes bên trong Dashboard */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="admin/sinh-vien" element={<StudentManager />} />
              <Route path="admin/mon-hoc" element={<SubjectManager />} />
              <Route path="admin/mo-lop" element={<ClassManager />} />
              <Route path="admin/dao-tao" element={<TrainingManager />} />

            </Route>
            
            {/* Sinh viên sub-routes bên trong Dashboard */}
            <Route element={<ProtectedRoute allowedRoles={['SINH_VIEN']} />}>
              <Route path="sinh-vien/dang-ky" element={<StudentModule />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;