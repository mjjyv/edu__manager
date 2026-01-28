import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import StudentManager from './pages/admin/StudentManager';


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



function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'GIANG_VIEN', 'SINH_VIEN']} />}>
        <Route path="/" element={<Dashboard />}>
          {/* Admin Routes */}
          <Route path="admin/sinh-vien" element={<StudentManager />} />
          <Route path="admin/mon-hoc" element={<div className="p-4">Quản lý Môn học</div>} />
          
          {/* Trang chủ mặc định sau login */}
          <Route index element={<div className="p-4">Chào mừng bạn quay lại hệ thống.</div>} />
        </Route>
      </Route>

        {/* Role-based Routes [cite: 71] */}
        <Route element={<ProtectedRoute allowedRoles={['SINH_VIEN']} />}>
          <Route path="/sinh-vien/*" element={<StudentModule />} />
        </Route>

        

        

        <Route element={<ProtectedRoute allowedRoles={['GIANG_VIEN']} />}>
          <Route path="/giang-vien/*" element={<TeacherModule />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin/*" element={<AdminModule />} />
        </Route>

        {/* Mặc định điều hướng về login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;