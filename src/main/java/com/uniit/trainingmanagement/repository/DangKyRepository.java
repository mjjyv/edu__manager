package com.uniit.trainingmanagement.repository;

import com.uniit.trainingmanagement.entity.DangKy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DangKyRepository extends JpaRepository<DangKy, Long> {
    // Lấy lịch sử đăng ký môn học của một sinh viên [cite: 264]
    List<DangKy> findBySinhVien_MaSV(String maSV);

    // Kiểm tra xem sinh viên đã đăng ký lớp này chưa (tránh trùng lặp) [cite: 290]
    boolean existsBySinhVien_MaSVAndLopHocPhan_MaLHP(String maSV, String maLHP);

    // Đếm sĩ số hiện tại của lớp học phần để kiểm tra điều kiện đầy lớp [cite: 285]
    long countByLopHocPhan_MaLHPAndTrangThai(String maLHP, String trangThai);
}