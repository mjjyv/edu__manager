package com.uniit.trainingmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChuyenNganhDTO {
    private String maNganh;
    private String tenNganh;
    private String maKhoa;
    private String tenKhoa;
}