package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lop_quan_ly")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LopQuanLy {
    @Id
    @Column(name = "ma_lop", length = 20)
    private String maLop;

    private String tenLop;

    @ManyToOne
    @JoinColumn(name = "ma_nganh")
    private ChuyenNganh chuyenNganh;
}