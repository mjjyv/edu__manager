package com.uniit.trainingmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DangKyDTO {
    @NotBlank(message = "Mã sinh viên là bắt buộc")
    private String maSV; // [cite: 35, 264]

    @NotBlank(message = "Mã lớp học phần là bắt buộc")
    private String maLHP; // [cite: 35, 265]
}