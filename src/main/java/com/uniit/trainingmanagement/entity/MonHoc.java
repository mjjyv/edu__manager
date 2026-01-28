package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mon_hoc")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonHoc {
    @Id
    @Column(name = "ma_mh", length = 10)
    private String maMH;

    @Column(nullable = false)
    private String tenMH;

    private Integer soTinChi;
}