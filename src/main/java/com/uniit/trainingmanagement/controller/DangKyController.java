package com.uniit.trainingmanagement.controller;

import com.uniit.trainingmanagement.dto.DangKyDTO;
import com.uniit.trainingmanagement.service.DangKyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dang-ky")
public class DangKyController {

    @Autowired private DangKyService dangKyService;

    @PostMapping
    public ResponseEntity<String> register(@Valid @RequestBody DangKyDTO dto) {
        dangKyService.thucHienDangKy(dto);
        return ResponseEntity.ok("Đăng ký lớp học phần thành công.");
    }
}