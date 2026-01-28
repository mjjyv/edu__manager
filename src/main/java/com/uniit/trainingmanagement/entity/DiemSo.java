package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "diem_so")
@IdClass(DiemId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiemSo {
    @Id
    @ManyToOne
    @JoinColumn(name = "ma_sv")
    private SinhVien sinhVien;

    @Id
    @ManyToOne
    @JoinColumn(name = "ma_lhp")
    private LopHocPhan lopHocPhan;

    private Double diemCC;
    private Double diemGK;
    private Double diemCK;

    @Transient
    public Double getDiemTongKet() {
        if (diemCC == null || diemGK == null || diemCK == null) return null;
        return (diemCC * 0.1) + (diemGK * 0.3) + (diemCK * 0.6);
    }
}