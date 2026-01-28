package com.uniit.trainingmanagement.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiemSoDTO {
    @NotBlank(message = "Mã sinh viên không được để trống")
    private String maSV; // [cite: 31, 36]

    @NotBlank(message = "Mã lớp học phần không được để trống")
    private String maLHP; // [cite: 33, 36]

    @DecimalMin(value = "0.0", message = "Điểm chuyên cần không được nhỏ hơn 0")
    @DecimalMax(value = "10.0", message = "Điểm chuyên cần không được lớn hơn 10")
    private Double diemCC; // [cite: 36, 278]

    @DecimalMin(value = "0.0", message = "Điểm giữa kỳ không được nhỏ hơn 0")
    @DecimalMax(value = "10.0", message = "Điểm giữa kỳ không được lớn hơn 10")
    private Double diemGK; // [cite: 36, 278]

    @DecimalMin(value = "0.0", message = "Điểm cuối kỳ không được nhỏ hơn 0")
    @DecimalMax(value = "10.0", message = "Điểm cuối kỳ không được lớn hơn 10")
    private Double diemCK; // [cite: 36, 278]
}