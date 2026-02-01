package com.uniit.trainingmanagement.controller;

import com.uniit.trainingmanagement.dto.MonHocDTO;
import com.uniit.trainingmanagement.service.MonHocService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mon-hoc")
@PreAuthorize("hasRole('ADMIN')") // [cite: 71, 600]
public class MonHocController {
    @Autowired private MonHocService monHocService;

    @GetMapping
    public ResponseEntity<List<MonHocDTO>> getAll() {
        return ResponseEntity.ok(monHocService.getAll());
    }

    @PostMapping
    public ResponseEntity<MonHocDTO> create(@Valid @RequestBody MonHocDTO dto) {
        return ResponseEntity.ok(monHocService.save(dto));
    }

    @PutMapping("/{maMH}")
    public ResponseEntity<MonHocDTO> update(@PathVariable String maMH, @Valid @RequestBody MonHocDTO dto) {
        // Đảm bảo ID trong DTO khớp với Path Variable
        dto.setMaMH(maMH); 
        return ResponseEntity.ok(monHocService.save(dto));
    }
    
    @DeleteMapping("/{maMH}")
    public ResponseEntity<Void> delete(@PathVariable String maMH) {
        monHocService.delete(maMH);
        return ResponseEntity.noContent().build();
    }
}