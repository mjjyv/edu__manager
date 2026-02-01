package com.uniit.trainingmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChuyenNganhDTO {
    @NotBlank(message = "Mã ngành không được để trống")
    private String maNganh;

    @NotBlank(message = "Tên ngành không được để trống")
    private String tenNganh;

    @NotBlank(message = "Vui lòng chọn Khoa chủ quản")
    private String maKhoa;
    
    private String tenKhoa; // Dùng để hiển thị
}