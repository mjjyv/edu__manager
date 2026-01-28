package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "dang_ky")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DangKy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ma_sv", nullable = false)
    private SinhVien sinhVien;

    @ManyToOne
    @JoinColumn(name = "ma_lhp", nullable = false)
    private LopHocPhan lopHocPhan;

    private LocalDateTime ngayDangKy;
    
    @Column(length = 20)
    private String trangThai; // CHO_DUYET, THANH_CONG, HUY
}