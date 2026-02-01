package com.uniit.trainingmanagement.dto;

import lombok.Data;

@Data
public class LopQuanLyDTO {
    private String maLop;
    private String tenLop;
    private String maNganh;
    private String tenNganh;
    private String tenKhoa;
    private long siSo; // Số lượng sinh viên hiện tại trong lớp
}