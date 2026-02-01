package com.uniit.trainingmanagement.controller;

import com.uniit.trainingmanagement.dto.LopHocPhanDTO;
import com.uniit.trainingmanagement.service.LopHocPhanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/lop-hoc-phan")
public class LopHocPhanController {
    @Autowired private LopHocPhanService lhpService;

    // API public cho Sinh viên/Giảng viên xem
    @GetMapping
    public ResponseEntity<List<LopHocPhanDTO>> getAll(
            @RequestParam(required = false) String hocKy,
            @RequestParam(required = false) String namHoc) {
        return ResponseEntity.ok(lhpService.getLHPByKy(hocKy, namHoc));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LopHocPhanDTO> create(@Valid @RequestBody LopHocPhanDTO dto) {
        return ResponseEntity.ok(lhpService.createLHP(dto));
    }

    @DeleteMapping("/{maLHP}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable String maLHP) {
        lhpService.deleteLHP(maLHP);
        return ResponseEntity.noContent().build();
    }
}