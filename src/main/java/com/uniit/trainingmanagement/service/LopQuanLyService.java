package com.uniit.trainingmanagement.service;

import com.uniit.trainingmanagement.dto.LopQuanLyDTO;
import com.uniit.trainingmanagement.entity.LopQuanLy;
import com.uniit.trainingmanagement.repository.LopQuanLyRepository;
import com.uniit.trainingmanagement.repository.SinhVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

import com.uniit.trainingmanagement.entity.ChuyenNganh;
import com.uniit.trainingmanagement.repository.ChuyenNganhRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Service
public class LopQuanLyService {
    @Autowired private LopQuanLyRepository lopQuanLyRepository;
    @Autowired private SinhVienRepository sinhVienRepository;

    @Autowired private ChuyenNganhRepository chuyenNganhRepository;

    public List<LopQuanLyDTO> getAllClasses() {
        List<LopQuanLy> list = lopQuanLyRepository.findAll();
        
        return list.stream().map(lop -> {
            LopQuanLyDTO dto = new LopQuanLyDTO();
            dto.setMaLop(lop.getMaLop());
            dto.setTenLop(lop.getTenLop());
            
            // Map thông tin Ngành và Khoa từ quan hệ [cite: 240, 241]
            if (lop.getChuyenNganh() != null) {
                dto.setMaNganh(lop.getChuyenNganh().getMaNganh());
                dto.setTenNganh(lop.getChuyenNganh().getTenNganh());
                if (lop.getChuyenNganh().getKhoa() != null) {
                    dto.setTenKhoa(lop.getChuyenNganh().getKhoa().getTenKhoa());
                }
            }
            
            // Đếm sĩ số thực tế [cite: 340]
            dto.setSiSo(sinhVienRepository.countByLopQuanLy_MaLop(lop.getMaLop()));
            
            return dto;
        }).collect(Collectors.toList());
    }

    // Hàm thêm mới Lớp Quản lý
    public LopQuanLyDTO createClass(LopQuanLyDTO dto) {
        // 1. Kiểm tra mã lớp trùng
        if (lopQuanLyRepository.existsById(dto.getMaLop())) {
            throw new RuntimeException("Mã lớp quản lý đã tồn tại: " + dto.getMaLop());
        }

        // 2. Tìm chuyên ngành
        ChuyenNganh chuyenNganh = chuyenNganhRepository.findById(dto.getMaNganh())
                .orElseThrow(() -> new RuntimeException("Chuyên ngành không tồn tại"));

        // 3. Map DTO sang Entity
        LopQuanLy entity = new LopQuanLy();
        entity.setMaLop(dto.getMaLop());
        entity.setTenLop(dto.getTenLop());
        entity.setChuyenNganh(chuyenNganh); // [cite: 241]

        // 4. Lưu và trả về
        lopQuanLyRepository.save(entity);
        
        // Cập nhật lại thông tin hiển thị cho DTO trả về
        dto.setTenNganh(chuyenNganh.getTenNganh());
        if (chuyenNganh.getKhoa() != null) {
            dto.setTenKhoa(chuyenNganh.getKhoa().getTenKhoa());
        }
        dto.setSiSo(0L); // Lớp mới chưa có sinh viên
        
        return dto;
    }

    public Page<LopQuanLyDTO> getClasses(Pageable pageable) {
        Page<LopQuanLy> pageResult = lopQuanLyRepository.findAll(pageable);
        return pageResult.map(this::convertToDTO); // Trả về Page object 
    }

    // ... các phương thức khác ...

    /**
     * Hàm hỗ trợ chuyển đổi từ Entity sang DTO để trả về cho Frontend
     */
    private LopQuanLyDTO convertToDTO(LopQuanLy lop) {
        LopQuanLyDTO dto = new LopQuanLyDTO();
        dto.setMaLop(lop.getMaLop());
        dto.setTenLop(lop.getTenLop());

        if (lop.getChuyenNganh() != null) {
            dto.setMaNganh(lop.getChuyenNganh().getMaNganh());
            dto.setTenNganh(lop.getChuyenNganh().getTenNganh());
            if (lop.getChuyenNganh().getKhoa() != null) {
                dto.setTenKhoa(lop.getChuyenNganh().getKhoa().getTenKhoa());
            }
        }

        // Đếm sĩ số thực tế từ bảng sinh viên
        dto.setSiSo(sinhVienRepository.countByLopQuanLy_MaLop(lop.getMaLop()));
        
        return dto;
    }
    
}