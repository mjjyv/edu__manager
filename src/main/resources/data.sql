-- 1. Làm sạch bảng trung gian/bảng con trước để tránh lỗi ràng buộc khóa ngoại [cite: 194, 228]
DELETE FROM sys_health_check;
DELETE FROM diem_so;
DELETE FROM dang_ky;

-- 1. Nạp dữ liệu Khoa [cite: 28, 233]
INSERT INTO khoa (ma_khoa, ten_khoa, email, dien_thoai) VALUES 
('FIT', N'Công nghệ thông tin', 'fit@uni.edu.vn', '0243111222'),
('FME', N'Cơ khí', 'fme@uni.edu.vn', '0243333444');

-- 2. Nạp dữ liệu Chuyên ngành [cite: 29, 237]
INSERT INTO chuyen_nganh (ma_nganh, ten_nganh, ma_khoa) VALUES 
('CNTT', N'Công nghệ thông tin', 'FIT'),
('KHMT', N'Khoa học máy tính', 'FIT'),
('CKD', N'Cơ khí động lực', 'FME');

-- 3. Nạp dữ liệu Môn học [cite: 4, 247]
INSERT INTO mon_hoc (ma_mh, ten_mh, so_tin_chi) VALUES 
('CS101', N'Lập trình cơ bản', 3),
('DB201', N'Cơ sở dữ liệu', 3),
('AI301', N'Trí tuệ nhân tạo', 4);

-- 4. Nạp dữ liệu Môn học tiên quyết [cite: 53]
-- Môn Cơ sở dữ liệu (DB201) yêu cầu Lập trình cơ bản (CS101)
INSERT INTO mon_hoc_tien_quyet (ma_mh, ma_mh_tq) VALUES 
('DB201', 'CS101'),
('AI301', 'CS101');

-- 5. Nạp dữ liệu Lớp Quản lý [cite: 30, 241]
INSERT INTO lop_quan_ly (ma_lop, ten_lop, ma_nganh) VALUES 
('CNTT01-K21', N'Lớp CNTT 1 Khóa 21', 'CNTT'),
('KHMT01-K21', N'Lớp Khoa học máy tính 1 Khóa 21', 'KHMT');

-- 6. Nạp dữ liệu Giảng viên [cite: 3, 258]
INSERT INTO giang_vien (ma_gv, ho_ten, hoc_vi, email, ma_khoa) VALUES 
('GV001', N'Nguyễn Văn A', N'Tiến sĩ', 'anv@uni.edu.vn', 'FIT'),
('GV002', N'Trần Thị B', N'Thạc sĩ', 'btt@uni.edu.vn', 'FIT');

-- 7. Nạp dữ liệu Sinh viên [cite: 31, 243, 905]
INSERT INTO sinh_vien (ma_sv, ho_ten, ngay_sinh, gioi_tinh, ma_lop, trang_thai) VALUES 
('20210001', N'Lê Văn C', '2003-05-15', N'Nam', 'CNTT01-K21', 'DANG_HOC'),
('20210002', N'Phạm Thị D', '2003-10-20', N'Nữ', 'CNTT01-K21', 'DANG_HOC');

-- 8. Nạp dữ liệu Lớp học phần [cite: 5, 249, 283]
INSERT INTO lop_hoc_phan (ma_lhp, ma_mh, ma_gv, hoc_ky, nam_hoc, si_so_toi_da) VALUES 
('LHP_CS101_01', 'CS101', 'GV001', '1', '2025-2026', 40),
('LHP_DB201_01', 'DB201', 'GV002', '1', '2025-2026', 40);

-- 9. Nạp dữ liệu Đăng ký tín chỉ [cite: 6, 263]
INSERT INTO dang_ky (ma_sv, ma_lhp, ngay_dang_ky, trang_thai) VALUES 
('20210001', 'LHP_CS101_01', GETDATE(), 'THANH_CONG'),
('20210002', 'LHP_CS101_01', GETDATE(), 'THANH_CONG');

-- 10. Nạp dữ liệu Điểm số [cite: 7, 254]
INSERT INTO diem_so (ma_sv, ma_lhp, diem_cc, diem_gk, diem_ck) VALUES 
('20210001', 'LHP_CS101_01', 9.0, 8.5, 8.0),
('20210002', 'LHP_CS101_01', 10.0, 7.0, 9.0);

-- 11. Nạp dữ liệu Người dùng (Bảo mật) [cite: 560, 638]
-- Mật khẩu tương ứng (BCrypt): admin123, gv123, sv123

-- 12. Khởi tạo trạng thái hệ thống [cite: 170]
INSERT INTO sys_health_check (service_name, status, checked_at) VALUES 
('BACKEND_SERVICE', 'ACTIVE', GETDATE());

-- 10. Nạp dữ liệu Tài khoản đăng nhập (Phục vụ Security) [cite: 639, 640, 641]

INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, vai_tro) 
VALUES ('20210001', '$2a$10$fuPNyWpqBaQvBSioWJ6EhOCjk2/vMVFTuaRGX73/Wjm5UqLlBPVrO', 'SINH_VIEN'),
VALUES ('admin', '$2a$10$kGgO.8DNUHKJW9POxKqAIuQIc4S08fuGDCT51hkblwcSSTXeVQaTK', 'ADMIN'),
VALUES ('giangvien01', '$2a$10$fuWnevp7Q5dfvdsxxrK6Jek9BMNuaKxOpH0cCXR85LNC0tLYLf0v2', 'GIANG_VIEN');