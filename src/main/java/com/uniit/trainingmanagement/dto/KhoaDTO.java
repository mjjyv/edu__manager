package com.uniit.trainingmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class KhoaDTO {
    @NotBlank(message = "Mã khoa không được để trống")
    private String maKhoa;
    
    @NotBlank(message = "Tên khoa không được để trống")
    private String tenKhoa;
    
    private String email;
    private String dienThoai;
}