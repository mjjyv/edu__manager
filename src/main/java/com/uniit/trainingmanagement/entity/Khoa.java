package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "khoa")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Khoa {
    @Id
    @Column(name = "ma_khoa", length = 10)
    private String maKhoa;

    @Column(name = "ten_khoa", nullable = false, length = 100)
    private String tenKhoa;

    private String email;
    private String dienThoai;

    @OneToMany(mappedBy = "khoa", cascade = CascadeType.ALL)
    private List<ChuyenNganh> chuyenNganhs;

    // Thêm vào danh sách thuộc tính của class Khoa hiện có
    @OneToMany(mappedBy = "khoa")
    private List<GiangVien> giangViens;
}