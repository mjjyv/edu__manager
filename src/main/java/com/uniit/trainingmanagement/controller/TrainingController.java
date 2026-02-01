package com.uniit.trainingmanagement.controller;

import com.uniit.trainingmanagement.dto.*;
import com.uniit.trainingmanagement.service.TrainingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/dao-tao")
@PreAuthorize("hasRole('ADMIN')")
public class TrainingController {
    @Autowired private TrainingService trainingService;

    // API Khoa
    @GetMapping("/khoa")
    public ResponseEntity<List<KhoaDTO>> getAllKhoa() {
        return ResponseEntity.ok(trainingService.getAllKhoa());
    }

    @PostMapping("/khoa")
    public ResponseEntity<KhoaDTO> saveKhoa(@Valid @RequestBody KhoaDTO dto) {
        return ResponseEntity.ok(trainingService.saveKhoa(dto));
    }

    @DeleteMapping("/khoa/{id}")
    public ResponseEntity<Void> deleteKhoa(@PathVariable String id) {
        trainingService.deleteKhoa(id);
        return ResponseEntity.noContent().build();
    }

    // API Chuyên Ngành
    @GetMapping("/chuyen-nganh")
    public ResponseEntity<List<ChuyenNganhDTO>> getAllChuyenNganh() {
        return ResponseEntity.ok(trainingService.getAllChuyenNganh());
    }

    @PostMapping("/chuyen-nganh")
    public ResponseEntity<ChuyenNganhDTO> saveChuyenNganh(@Valid @RequestBody ChuyenNganhDTO dto) {
        return ResponseEntity.ok(trainingService.saveChuyenNganh(dto));
    }
    
    @DeleteMapping("/chuyen-nganh/{id}")
    public ResponseEntity<Void> deleteChuyenNganh(@PathVariable String id) {
        trainingService.deleteChuyenNganh(id);
        return ResponseEntity.noContent().build();
    }
}