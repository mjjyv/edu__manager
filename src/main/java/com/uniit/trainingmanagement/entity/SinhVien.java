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
    @Column(name = "ma_sv")
    private String maSV;

    @Column(name = "ho_ten", nullable = false)
    private String hoTen;

    @Column(name = "ngay_sinh")
    private LocalDate ngaySinh;

    @Column(name = "gioi_tinh", columnDefinition = "NVARCHAR(10)")
    private String gioiTinh;

    // Quan hệ với lớp quản lý (Many-to-One)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_lop")
    private LopQuanLy lopQuanLy;

    // --- Cập nhật cho Giai đoạn 4 & 5 (Soft Delete) ---
    @Column(name = "trang_thai")
    private String trangThai = "DANG_HOC"; // DANG_HOC, DA_XOA, DA_TOT_NGHIEP

    @Column(name = "ngay_xoa")
    private LocalDateTime ngayXoa;

    @Column(name = "ly_do_xoa")
    private String lyDoXoa;
}