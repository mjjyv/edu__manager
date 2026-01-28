package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "sinh_vien")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SinhVien {
    @Id
    @Column(name = "ma_sv", length = 15)
    private String maSV;

    @Column(nullable = false)
    private String hoTen;

    private LocalDate ngaySinh;
    private String gioiTinh;

    @ManyToOne
    @JoinColumn(name = "ma_lop")
    private LopQuanLy lopQuanLy;

    // === CÁC TRƯỜNG MỚI ĐỂ PHỤC VỤ SOFT DELETE ===
    
    @Column(name = "trang_thai")
    private String trangThai = "DANG_HOC"; // Mặc định là đang học

    @Column(name = "ngay_xoa")
    private LocalDateTime ngayXoa;

    @Column(name = "ly_do_xoa")
    private String lyDoXoa;
}