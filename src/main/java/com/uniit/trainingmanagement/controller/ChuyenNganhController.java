package com.uniit.trainingmanagement.controller;

import com.uniit.trainingmanagement.entity.ChuyenNganh;
import com.uniit.trainingmanagement.repository.ChuyenNganhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/chuyen-nganh")
public class ChuyenNganhController {
    @Autowired private ChuyenNganhRepository repository;

    @GetMapping
    public ResponseEntity<List<ChuyenNganh>> getAll() {
        // Trả về danh sách để đổ vào combobox
        return ResponseEntity.ok(repository.findAll());
    }
}