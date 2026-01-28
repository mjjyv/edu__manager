import { 
    User, BookOpen, Calendar, GraduationCap, 
    FileText, Settings, LayoutDashboard, ClipboardList 
} from 'lucide-react';

export const MENU_ITEMS = {
    ADMIN: [
        { title: 'Tổng quan', path: '/', icon: LayoutDashboard },
        { title: 'Quản lý Sinh viên', path: '/admin/sinh-vien', icon: User },
        { title: 'Quản lý Môn học', path: '/admin/mon-hoc', icon: BookOpen },
        { title: 'Quản lý Đào tạo', path: '/admin/dao-tao', icon: Settings },
        { title: 'Mở lớp học phần', path: '/admin/mo-lop', icon: ClipboardList },
    ],
    GIANG_VIEN: [
        { title: 'Tổng quan', path: '/', icon: LayoutDashboard },
        { title: 'Lớp giảng dạy', path: '/giang-vien/lop-hoc', icon: Calendar },
        { title: 'Nhập điểm', path: '/giang-vien/nhap-diem', icon: FileText },
    ],
    SINH_VIEN: [
        { title: 'Tổng quan', path: '/', icon: LayoutDashboard },
        { title: 'Đăng ký tín chỉ', path: '/sinh-vien/dang-ky', icon: ClipboardList },
        { title: 'Thời khóa biểu', path: '/sinh-vien/lich-hoc', icon: Calendar },
        { title: 'Kết quả học tập', path: '/sinh-vien/ket-qua', icon: GraduationCap },
    ]
};