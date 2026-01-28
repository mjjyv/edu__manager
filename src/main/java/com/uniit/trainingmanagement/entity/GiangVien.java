package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

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

    @OneToMany(mappedBy = "giangVien")
    private List<LopHocPhan> lopHocPhans;
}