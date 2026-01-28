package com.uniit.trainingmanagement.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BangDiemDTO {
    private String maMH; // [cite: 247]
    private String tenMH; // [cite: 248]
    private Integer soTinChi; // [cite: 248]
    private Double diemCC; // [cite: 36, 255]
    private Double diemGK; // [cite: 36, 256]
    private Double diemCK; // [cite: 36, 256]
    private Double diemTongKet; // [cite: 256]

    /**
     * Điểm tổng kết được tính toán dựa trên trọng số hệ thống[cite: 257]:
     */
    // $$DiemTongKet = (DiemCC \times 0.1) + (DiemGK \times 0.3) + (DiemCK \times 0.6)$$
}