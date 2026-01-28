package com.uniit.trainingmanagement.dto;

import lombok.*;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private Map<String, String> errors; // Lưu chi tiết lỗi của từng trường (field)
}