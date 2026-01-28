package com.uniit.trainingmanagement.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SinhVienDetailDTO {
    // Thông tin cá nhân
    private String maSV;
    private String hoTen;
    private LocalDate ngaySinh;
    private String gioiTinh;
    
    // Thông tin đào tạo (Lấy từ các bảng quan hệ)
    private String maLop;
    private String tenLop;
    private String tenNganh;
    private String tenKhoa;
    
    // Trạng thái (Soft Delete)
    private String trangThai;
    private LocalDateTime ngayXoa;
    private String lyDoXoa;
    
    // Kết quả học tập (Tính toán)
    private Double gpa; // Điểm trung bình tích lũy
}