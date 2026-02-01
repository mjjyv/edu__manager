package com.uniit.trainingmanagement.controller;

import com.uniit.trainingmanagement.dto.LopQuanLyDTO;
import com.uniit.trainingmanagement.service.LopQuanLyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // Nhớ import dòng này
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/api/lop-quan-ly")
public class LopQuanLyController {
    
    @Autowired private LopQuanLyService lopQuanLyService;

    // 1. API Lấy danh sách (GET) - Đã có
    @GetMapping
    public ResponseEntity<Page<LopQuanLyDTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "maLop") String sortBy) {
        return ResponseEntity.ok(
            lopQuanLyService.getClasses(PageRequest.of(page, size, Sort.by(sortBy)))
        );
    }

    // 2. API Thêm mới (POST) - BẠN ĐANG THIẾU ĐOẠN NÀY
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Chỉ ADMIN mới được thêm
    public ResponseEntity<LopQuanLyDTO> createClass(@RequestBody LopQuanLyDTO dto) {
        return ResponseEntity.ok(lopQuanLyService.createClass(dto));
    }
}