package com.uniit.trainingmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class SinhVienUpdateDTO {
    @NotBlank(message = "Họ tên không được để trống")
    private String hoTen;

    @NotNull(message = "Ngày sinh không được để trống")
    private LocalDate ngaySinh;

    private String gioiTinh;

    @NotBlank(message = "Mã lớp quản lý không được để trống")
    private String maLop; // Cho phép chuyển lớp
}