package com.uniit.trainingmanagement.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.util.List;

@Data
public class MonHocDTO {
    @NotBlank(message = "Mã môn học không được để trống")
    private String maMH;

    @NotBlank(message = "Tên môn học không được để trống")
    private String tenMH;

    @NotNull
    @Min(value = 1, message = "Số tín chỉ phải lớn hơn 0")
    private Integer soTinChi;

    // Danh sách mã các môn học cần học trước
    private List<String> maMonTienQuyet; 
}