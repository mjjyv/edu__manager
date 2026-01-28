package com.uniit.trainingmanagement.service;

import com.uniit.trainingmanagement.dto.SinhVienDTO;
import com.uniit.trainingmanagement.dto.SinhVienDetailDTO;
import com.uniit.trainingmanagement.dto.SinhVienUpdateDTO;
import com.uniit.trainingmanagement.entity.LopQuanLy;
import com.uniit.trainingmanagement.entity.SinhVien;
import com.uniit.trainingmanagement.repository.LopQuanLyRepository;
import com.uniit.trainingmanagement.repository.SinhVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SinhVienService {
    @Autowired private SinhVienRepository sinhVienRepository;
    @Autowired private LopQuanLyRepository lopQuanLyRepository;

    public SinhVienDTO createSinhVien(SinhVienDTO dto) {
        LopQuanLy lop = lopQuanLyRepository.findById(dto.getMaLop())
                .orElseThrow(() -> new RuntimeException("Lớp quản lý không tồn tại"));
        
        SinhVien sv = new SinhVien();
        sv.setMaSV(dto.getMaSV());
        sv.setHoTen(dto.getHoTen());
        sv.setNgaySinh(dto.getNgaySinh());
        sv.setGioiTinh(dto.getGioiTinh());
        sv.setLopQuanLy(lop);
        
        sinhVienRepository.save(sv);
        return dto;
    }


    // Cập nhật hàm lấy danh sách để lọc sinh viên đã xóa
    public List<SinhVienDTO> getSinhVienByLop(String maLop) {
        // Sử dụng hàm query mới tạo ở Repository
        return sinhVienRepository.findActiveStudentsByClass(maLop).stream()
                .map(sv -> new SinhVienDTO(sv.getMaSV(), sv.getHoTen(), sv.getNgaySinh(), sv.getGioiTinh(), maLop))
                .collect(Collectors.toList());
    }

    // Hàm Soft Delete
    public void softDeleteSinhVien(String maSV, String lyDo) {
        SinhVien sv = sinhVienRepository.findById(maSV)
                .orElseThrow(() -> new RuntimeException("Sinh viên không tồn tại"));
        
        sv.setTrangThai("DA_XOA");
        sv.setNgayXoa(LocalDateTime.now());
        sv.setLyDoXoa(lyDo);
        
        sinhVienRepository.save(sv);
    }

    @Autowired private DiemSoService diemSoService; // Để lấy GPA

    public SinhVienDetailDTO getStudentDetail(String maSV) {
        SinhVien sv = sinhVienRepository.findById(maSV)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sinh viên"));

        SinhVienDetailDTO dto = new SinhVienDetailDTO();
        
        // 1. Map thông tin cơ bản
        dto.setMaSV(sv.getMaSV());
        dto.setHoTen(sv.getHoTen());
        dto.setNgaySinh(sv.getNgaySinh());
        dto.setGioiTinh(sv.getGioiTinh());
        dto.setTrangThai(sv.getTrangThai());
        dto.setNgayXoa(sv.getNgayXoa());
        dto.setLyDoXoa(sv.getLyDoXoa());

        // 2. Map thông tin tổ chức (Nested Objects)
        if (sv.getLopQuanLy() != null) {
            dto.setMaLop(sv.getLopQuanLy().getMaLop());
            dto.setTenLop(sv.getLopQuanLy().getTenLop());
            
            if (sv.getLopQuanLy().getChuyenNganh() != null) {
                dto.setTenNganh(sv.getLopQuanLy().getChuyenNganh().getTenNganh());
                
                if (sv.getLopQuanLy().getChuyenNganh().getKhoa() != null) {
                    dto.setTenKhoa(sv.getLopQuanLy().getChuyenNganh().getKhoa().getTenKhoa());
                }
            }
        }

        // 3. Tính GPA (Gọi từ DiemSoService đã có ở Giai đoạn 3)
        try {
            Double gpa = diemSoService.tinhGPA(maSV);
            dto.setGpa(gpa);
        } catch (Exception e) {
            dto.setGpa(0.0);
        }

        return dto;
    }

    public SinhVienDTO updateSinhVien(String maSV, SinhVienUpdateDTO dto) {
        // 1. Tìm sinh viên cần sửa
        SinhVien sv = sinhVienRepository.findById(maSV)
                .orElseThrow(() -> new RuntimeException("Sinh viên không tồn tại: " + maSV));

        // 2. Kiểm tra lớp mới (nếu thay đổi lớp)
        if (!sv.getLopQuanLy().getMaLop().equals(dto.getMaLop())) {
            LopQuanLy lopMoi = lopQuanLyRepository.findById(dto.getMaLop())
                    .orElseThrow(() -> new RuntimeException("Mã lớp quản lý không tồn tại: " + dto.getMaLop()));
            sv.setLopQuanLy(lopMoi);
        }

        // 3. Cập nhật thông tin cá nhân
        sv.setHoTen(dto.getHoTen());
        sv.setNgaySinh(dto.getNgaySinh());
        sv.setGioiTinh(dto.getGioiTinh());

        // 4. Lưu và trả về DTO
        SinhVien updated = sinhVienRepository.save(sv);
        return new SinhVienDTO(
            updated.getMaSV(), 
            updated.getHoTen(), 
            updated.getNgaySinh(), 
            updated.getGioiTinh(), 
            updated.getLopQuanLy().getMaLop()
        );
    }
}