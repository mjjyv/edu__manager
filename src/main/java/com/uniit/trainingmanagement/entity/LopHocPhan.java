package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lop_hoc_phan")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LopHocPhan {
    @Id
    @Column(name = "ma_lhp", length = 20)
    private String maLHP;

    @ManyToOne
    @JoinColumn(name = "ma_mh")
    private MonHoc monHoc;

    @ManyToOne
    @JoinColumn(name = "ma_gv")
    private GiangVien giangVien;

    private String hocKy;
    private String namHoc;

    @Column(name = "si_so_toi_da")
    private Integer siSoToiDa; //
}