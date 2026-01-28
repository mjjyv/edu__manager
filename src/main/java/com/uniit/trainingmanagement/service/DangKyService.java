package com.uniit.trainingmanagement.service;

import com.uniit.trainingmanagement.dto.DangKyDTO;
import com.uniit.trainingmanagement.entity.*;
import com.uniit.trainingmanagement.exception.RegistrationException;
import com.uniit.trainingmanagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
public class DangKyService {

    @Autowired private DangKyRepository dangKyRepository;
    @Autowired private LopHocPhanRepository lopHocPhanRepository;
    @Autowired private SinhVienRepository sinhVienRepository;
    @Autowired private DiemSoRepository diemSoRepository;

    @Transactional(rollbackFor = Exception.class)
    public void thucHienDangKy(DangKyDTO dto) {
        // 1. Kiểm tra sự tồn tại của Sinh viên và Lớp học phần
        SinhVien sv = sinhVienRepository.findById(dto.getMaSV())
                .orElseThrow(() -> new RegistrationException("Sinh viên không tồn tại trên hệ thống."));
        
        LopHocPhan lhp = lopHocPhanRepository.findById(dto.getMaLHP())
                .orElseThrow(() -> new RegistrationException("Lớp học phần không tồn tại hoặc đã bị đóng."));

        // 2. Kiểm tra xem sinh viên đã đăng ký lớp này chưa
        if (dangKyRepository.existsBySinhVien_MaSVAndLopHocPhan_MaLHP(dto.getMaSV(), dto.getMaLHP())) {
            throw new RegistrationException("Bạn đã đăng ký lớp học phần này trước đó.");
        }

        // 3. Kiểm tra sĩ số lớp (Business Logic Check)
        long siSoHienTai = dangKyRepository.countByLopHocPhan_MaLHPAndTrangThai(dto.getMaLHP(), "THANH_CONG");
        // Giả sử sĩ số tối đa mặc định là 50 nếu không được cấu hình cụ thể
        if (siSoHienTai >= 50) {
            throw new RegistrationException("Đăng ký thất bại: Lớp học phần đã đủ sĩ số tối đa.");
        }

        // 4. Lưu thông tin đăng ký
        DangKy record = new DangKy();
        record.setSinhVien(sv);
        record.setLopHocPhan(lhp);
        record.setNgayDangKy(LocalDateTime.now());
        record.setTrangThai("THANH_CONG");
        dangKyRepository.save(record);

        // 5. Khởi tạo bản ghi điểm (DiemSo) rỗng cho sinh viên
        // Điều này giúp giảng viên thấy tên sinh viên trong danh sách nhập điểm sau này
        DiemSo diemTrong = new DiemSo();
        diemTrong.setSinhVien(sv);
        diemTrong.setLopHocPhan(lhp);
        // Điểm để null cho đến khi giảng viên nhập
        diemSoRepository.save(diemTrong);
    }

    @Transactional
    public void huyDangKy(String maSV, String maLHP) {
        // Xử lý hủy đăng ký và xóa bản ghi điểm tương ứng
        // Logic này cần kiểm tra xem đã có điểm chưa (thường có điểm rồi thì không cho hủy)
    }
}