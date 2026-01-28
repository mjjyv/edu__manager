package com.uniit.trainingmanagement.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SinhVienDTO {
    @NotBlank(message = "Mã sinh viên không được để trống")
    @Size(max = 15)
    private String maSV; // [cite: 31, 243]

    @NotBlank(message = "Họ tên không được để trống")
    @Size(max = 100)
    private String hoTen; // [cite: 31, 244]

    @NotNull(message = "Ngày sinh không được để trống")
    private LocalDate ngaySinh; // [cite: 31, 244]

    private String gioiTinh; // [cite: 31, 244]

    @NotBlank(message = "Mã lớp quản lý không được để trống")
    private String maLop; // [cite: 31, 245]
}