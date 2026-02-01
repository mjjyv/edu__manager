package com.uniit.trainingmanagement.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LopHocPhanDTO {
    @NotBlank(message = "Mã lớp học phần không được để trống")
    private String maLHP;

    @NotBlank(message = "Vui lòng chọn môn học")
    private String maMH;
    private String tenMH; // Dùng để hiển thị ra UI

    @NotBlank(message = "Vui lòng chọn giảng viên")
    private String maGV;
    private String tenGV; // Dùng để hiển thị ra UI

    @NotBlank(message = "Học kỳ không được để trống")
    private String hocKy;

    @NotBlank(message = "Năm học không được để trống")
    private String namHoc;

    @Min(value = 10, message = "Sĩ số tối thiểu là 10")
    private Integer siSoToiDa = 50;
    
    private String phongHoc; // Tùy chọn
}