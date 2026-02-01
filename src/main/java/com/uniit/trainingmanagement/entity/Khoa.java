package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore; // Import thư viện này

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

    // SỬA LỖI: Thêm @JsonIgnore để ngắt vòng lặp ChuyenNganh -> Khoa -> ChuyenNganh...
    @OneToMany(mappedBy = "khoa", cascade = CascadeType.ALL)
    @JsonIgnore 
    @ToString.Exclude // Thêm cái này để tránh lỗi StackOverflow khi log
    private List<ChuyenNganh> chuyenNganhs;

    // SỬA LỖI: Thêm @JsonIgnore để ngắt vòng lặp GiangVien -> Khoa -> GiangVien...
    @OneToMany(mappedBy = "khoa")
    @JsonIgnore
    @ToString.Exclude
    private List<GiangVien> giangViens;
}