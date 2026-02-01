package com.uniit.trainingmanagement.controller;

import com.uniit.trainingmanagement.dto.LopQuanLyDTO;
import com.uniit.trainingmanagement.service.LopQuanLyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/api/lop-quan-ly")
public class LopQuanLyController {
    
    @Autowired private LopQuanLyService lopQuanLyService;

    // SỬA LỖI: Chỉ giữ lại MỘT phương thức getAll duy nhất
    @GetMapping
    public ResponseEntity<Page<LopQuanLyDTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "maLop") String sortBy) { 
        
        // Trả về Page object với đầy đủ tham số phân trang và sắp xếp
        return ResponseEntity.ok(
            lopQuanLyService.getClasses(PageRequest.of(page, size, Sort.by(sortBy)))
        );
    }
    
    // Đã xóa phương thức getAll thứ 2 bị trùng lặp
}