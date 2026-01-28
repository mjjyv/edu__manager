package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "chuyen_nganh")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChuyenNganh {
    @Id
    @Column(name = "ma_nganh", length = 10)
    private String maNganh;

    @Column(name = "ten_nganh", nullable = false, length = 100)
    private String tenNganh;

    @ManyToOne
    @JoinColumn(name = "ma_khoa", nullable = false)
    private Khoa khoa;
}