-- DỮ LIỆU KHỞI TẠO HỆ THỐNG UNI-IT (REWRITTEN FOR STARTUP SAFETY)

-- 1. Làm sạch bảng trung gian/bảng con trước để tránh lỗi ràng buộc khóa ngoại [cite: 194, 228]
DELETE FROM sys_health_check;
DELETE FROM diem_so;
DELETE FROM dang_ky;

-- 2. Nạp dữ liệu Khoa [cite: 269, 306]
IF NOT EXISTS (SELECT * FROM khoa WHERE ma_khoa = 'FIT')
INSERT INTO khoa (ma_khoa, ten_khoa, email, dien_thoai) VALUES ('FIT', N'Công nghệ thông tin', 'fit@uni.edu.vn', '0243111222');
IF NOT EXISTS (SELECT * FROM khoa WHERE ma_khoa = 'FME')
INSERT INTO khoa (ma_khoa, ten_khoa, email, dien_thoai) VALUES ('FME', N'Cơ khí', 'fme@uni.edu.vn', '0243333444');

-- 3. Nạp dữ liệu Chuyên ngành [cite: 270, 307]
IF NOT EXISTS (SELECT * FROM chuyen_nganh WHERE ma_nganh = 'CNTT')
INSERT INTO chuyen_nganh (ma_nganh, ten_nganh, ma_khoa) VALUES ('CNTT', N'Công nghệ thông tin', 'FIT');
IF NOT EXISTS (SELECT * FROM chuyen_nganh WHERE ma_nganh = 'KHMT')
INSERT INTO chuyen_nganh (ma_nganh, ten_nganh, ma_khoa) VALUES ('KHMT', N'Khoa học máy tính', 'FIT');

-- 4. Nạp dữ liệu Môn học [cite: 274, 310]
IF NOT EXISTS (SELECT * FROM mon_hoc WHERE ma_mh = 'CS101')
INSERT INTO mon_hoc (ma_mh, ten_mh, so_tin_chi) VALUES ('CS101', N'Lập trình cơ bản', 3);
IF NOT EXISTS (SELECT * FROM mon_hoc WHERE ma_mh = 'DB201')
INSERT INTO mon_hoc (ma_mh, ten_mh, so_tin_chi) VALUES ('DB201', N'Cơ sở dữ liệu', 3);

-- 5. Nạp dữ liệu Lớp Quản lý [cite: 271, 308]
IF NOT EXISTS (SELECT * FROM lop_quan_ly WHERE ma_lop = 'CNTT01-K21')
INSERT INTO lop_quan_ly (ma_lop, ten_lop, ma_nganh) VALUES ('CNTT01-K21', N'Lớp CNTT 1 Khóa 21', 'CNTT');

-- 6. Nạp dữ liệu Giảng viên [cite: 272, 309]
IF NOT EXISTS (SELECT * FROM giang_vien WHERE ma_gv = 'GV001')
INSERT INTO giang_vien (ma_gv, ho_ten, hoc_vi, email, ma_khoa) VALUES ('GV001', N'Nguyễn Văn A', N'Tiến sĩ', 'anv@uni.edu.vn', 'FIT');

-- 7. Nạp dữ liệu Sinh viên [cite: 273, 311]
IF NOT EXISTS (SELECT * FROM sinh_vien WHERE ma_sv = '20210001')
INSERT INTO sinh_vien (ma_sv, ho_ten, ngay_sinh, gioi_tinh, ma_lop, trang_thai) VALUES ('20210001', N'Lê Văn C', '2003-05-15', N'Nam', 'CNTT01-K21', 'DANG_HOC');

-- 8. Nạp dữ liệu Lớp học phần [cite: 275, 312]
IF NOT EXISTS (SELECT * FROM lop_hoc_phan WHERE ma_lhp = 'LHP_CS101_01')
INSERT INTO lop_hoc_phan (ma_lhp, ma_mh, ma_gv, hoc_ky, nam_hoc, si_so_toi_da) VALUES ('LHP_CS101_01', 'CS101', 'GV001', '1', '2025-2026', 40);

-- 9. Nạp dữ liệu Giao dịch và Điểm (Luôn nạp mới sau khi đã xóa ở bước 1) [cite: 313, 314]
INSERT INTO dang_ky (ma_sv, ma_lhp, ngay_dang_ky, trang_thai) VALUES ('20210001', 'LHP_CS101_01', GETDATE(), 'THANH_CONG');
INSERT INTO diem_so (ma_sv, ma_lhp, diem_cc, diem_gk, diem_ck) VALUES ('20210001', 'LHP_CS101_01', 9.0, 8.5, 8.0);

-- 10. Nạp dữ liệu Người dùng [cite: 560, 638, 639, 640]
IF NOT EXISTS (SELECT * FROM nguoi_dung WHERE ten_dang_nhap = 'admin')
INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, vai_tro)
VALUES ('admin', '$2a$10$kGgO.8DNUHKJW9POxKqAIuQIc4S08fuGDCT51hkblwcSSTXeVQaTK', 'ADMIN');


IF NOT EXISTS (SELECT * FROM nguoi_dung WHERE ten_dang_nhap = 'giangvien01')
INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, vai_tro)
VALUES ('giangvien01', '$2a$10$fuWnevp7Q5dfvdsxxrK6Jek9BMNuaKxOpH0cCXR85LNC0tLYLf0v2', 'GIANG_VIEN');


IF NOT EXISTS (SELECT * FROM nguoi_dung WHERE ten_dang_nhap = '20210001')
INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, vai_tro)
VALUES ('20210001', '$2a$10$fuPNyWpqBaQvBSioWJ6EhOCjk2/vMVFTuaRGX73/Wjm5UqLlBPVrO', 'SINH_VIEN');


-- 11. Cập nhật Health Check [cite: 144, 181]
INSERT INTO sys_health_check (service_name, status, checked_at) VALUES ('BACKEND_SERVICE', 'ACTIVE', GETDATE());
