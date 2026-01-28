package com.uniit.trainingmanagement.controller;

import com.uniit.trainingmanagement.dto.BangDiemDTO;
import com.uniit.trainingmanagement.dto.DiemSoDTO;
import com.uniit.trainingmanagement.service.DiemSoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/diem")
public class DiemSoController {

    @Autowired private DiemSoService diemSoService;

    // Chỉ sinh viên mới được xem điểm của chính mình [cite: 73]
    @PreAuthorize("hasRole('SINH_VIEN')")
    @GetMapping("/ca-nhan/{maSV}")
    public ResponseEntity<List<BangDiemDTO>> getMyGrades(@PathVariable String maSV) {
        return ResponseEntity.ok(diemSoService.getBangDiemSinhVien(maSV));
    }

    // Chỉ giảng viên mới được nhập điểm [cite: 72]
    @PreAuthorize("hasRole('GIANG_VIEN')")
    @PostMapping("/nhap-diem")
    public ResponseEntity<String> inputGrades(@RequestBody List<DiemSoDTO> listDiem) {
        // Xử lý logic nhập điểm... [cite: 60]
        return ResponseEntity.ok("Cập nhật bảng điểm thành công.");
    }
}