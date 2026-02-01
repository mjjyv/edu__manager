package com.uniit.trainingmanagement.service;

import com.uniit.trainingmanagement.dto.LopHocPhanDTO;
import com.uniit.trainingmanagement.entity.*;
import com.uniit.trainingmanagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LopHocPhanService {
    @Autowired private LopHocPhanRepository lhpRepository;
    @Autowired private MonHocRepository monHocRepository;
    @Autowired private GiangVienRepository giangVienRepository;

    // Lấy danh sách lớp theo kỳ (Hỗ trợ bộ lọc)
    public List<LopHocPhanDTO> getLHPByKy(String hocKy, String namHoc) {
        List<LopHocPhan> list;
        if (hocKy != null && namHoc != null) {
            list = lhpRepository.findByHocKyAndNamHoc(hocKy, namHoc);
        } else {
            list = lhpRepository.findAll();
        }
        return list.stream().map(this::toDTO).collect(Collectors.toList());
    }

    // Mở lớp mới
    @Transactional
    public LopHocPhanDTO createLHP(LopHocPhanDTO dto) {
        if (lhpRepository.existsById(dto.getMaLHP())) {
            throw new RuntimeException("Mã lớp học phần đã tồn tại: " + dto.getMaLHP());
        }

        MonHoc mh = monHocRepository.findById(dto.getMaMH())
            .orElseThrow(() -> new RuntimeException("Môn học không tồn tại"));
        GiangVien gv = giangVienRepository.findById(dto.getMaGV())
            .orElseThrow(() -> new RuntimeException("Giảng viên không tồn tại"));

        LopHocPhan lhp = new LopHocPhan();
        lhp.setMaLHP(dto.getMaLHP());
        lhp.setMonHoc(mh);
        lhp.setGiangVien(gv);
        lhp.setHocKy(dto.getHocKy());
        lhp.setNamHoc(dto.getNamHoc());
        lhp.setSiSoToiDa(dto.getSiSoToiDa());
        // lhp.setPhongHoc(dto.getPhongHoc()); // Nếu entity có trường này

        return toDTO(lhpRepository.save(lhp));
    }

    // Xóa lớp (Nếu chưa có sinh viên đăng ký)
    public void deleteLHP(String maLHP) {
        // Cần check bảng DangKy trước (logic mở rộng)
        lhpRepository.deleteById(maLHP);
    }

    private LopHocPhanDTO toDTO(LopHocPhan entity) {
        LopHocPhanDTO dto = new LopHocPhanDTO();
        dto.setMaLHP(entity.getMaLHP());
        dto.setMaMH(entity.getMonHoc().getMaMH());
        dto.setTenMH(entity.getMonHoc().getTenMH());
        dto.setMaGV(entity.getGiangVien().getMaGV());
        dto.setTenGV(entity.getGiangVien().getHoTen());
        dto.setHocKy(entity.getHocKy());
        dto.setNamHoc(entity.getNamHoc());
        dto.setSiSoToiDa(entity.getSiSoToiDa());
        return dto;
    }
}