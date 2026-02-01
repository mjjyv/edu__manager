package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "giang_vien")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GiangVien {
    @Id
    @Column(name = "ma_gv", length = 15)
    private String maGV;

    @Column(nullable = false, length = 100)
    private String hoTen;

    @Column(length = 50)
    private String hocVi; // Thạc sĩ, Tiến sĩ, PGS, GS

    @Column(unique = true)
    private String email;


    @ManyToOne
    @JoinColumn(name = "ma_khoa", nullable = false)
    private Khoa khoa;

    // SỬA LỖI: Ngắt vòng lặp khi lấy giảng viên (tránh load hết lớp học phần)
    @OneToMany(mappedBy = "giangVien")
    @JsonIgnore 
    private List<LopHocPhan> lopHocPhans;
}