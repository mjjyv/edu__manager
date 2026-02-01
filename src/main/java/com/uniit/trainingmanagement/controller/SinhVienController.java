package com.uniit.trainingmanagement.controller;

import com.uniit.trainingmanagement.dto.SinhVienDTO;
import com.uniit.trainingmanagement.dto.SinhVienDetailDTO;
import com.uniit.trainingmanagement.dto.SinhVienUpdateDTO;
import com.uniit.trainingmanagement.service.SinhVienService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/sinh-vien")
public class SinhVienController {

    @Autowired private SinhVienService sinhVienService;

    @PostMapping
    public ResponseEntity<SinhVienDTO> addStudent(@Valid @RequestBody SinhVienDTO dto) {
        return ResponseEntity.ok(sinhVienService.createSinhVien(dto));
    }

    @GetMapping("/lop/{maLop}")
    public ResponseEntity<List<SinhVienDTO>> getByLop(@PathVariable String maLop) {
        return ResponseEntity.ok(sinhVienService.getSinhVienByLop(maLop));
    }

    // Endpoint xóa mềm: PUT /api/sinh-vien/{maSV}/soft-delete
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{maSV}/soft-delete")
    public ResponseEntity<String> deleteStudent(
            @PathVariable String maSV, 
            @RequestBody Map<String, String> payload) {
        
        String lyDo = payload.get("lyDo");
        if (lyDo == null || lyDo.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Vui lòng cung cấp lý do xóa.");
        }

        sinhVienService.softDeleteSinhVien(maSV, lyDo);
        return ResponseEntity.ok("Đã xóa sinh viên thành công (Soft Delete).");
    }

    @GetMapping("/{maSV}/detail")
    @PreAuthorize("hasAnyRole('ADMIN', 'SINH_VIEN', 'GIANG_VIEN')")
    public ResponseEntity<SinhVienDetailDTO> getStudentDetail(@PathVariable String maSV) {
        return ResponseEntity.ok(sinhVienService.getStudentDetail(maSV));
    }


    @PutMapping("/{maSV}")
    @PreAuthorize("hasRole('ADMIN')") // Chỉ Admin mới được sửa hồ sơ gốc [cite: 71]
    public ResponseEntity<SinhVienDTO> updateStudent(
            @PathVariable String maSV,
            @Valid @RequestBody SinhVienUpdateDTO dto) {
        return ResponseEntity.ok(sinhVienService.updateSinhVien(maSV, dto));
    }

    // Thêm Endpoint tìm kiếm theo Mã sinh viên
    @GetMapping("/{maSV}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SinhVienDTO> getStudentById(@PathVariable String maSV) {
        // Gọi Service tìm kiếm (Sử dụng logic có sẵn hoặc findById của Repository)
        // Lưu ý: Logic này nên trả về DTO cơ bản dùng cho bảng danh sách
        return sinhVienService.getSinhVienById(maSV)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}