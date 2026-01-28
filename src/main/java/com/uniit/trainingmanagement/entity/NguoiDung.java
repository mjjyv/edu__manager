package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "nguoi_dung")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NguoiDung {
    @Id
    private String tenDangNhap;
    private String matKhau;
    private String vaiTro; // ADMIN, GIANG_VIEN, SINH_VIEN
}