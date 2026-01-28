package com.uniit.trainingmanagement.repository;

import com.uniit.trainingmanagement.entity.GiangVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface GiangVienRepository extends JpaRepository<GiangVien, String> {
    // Tìm giảng viên theo Khoa để phân công dạy
    List<GiangVien> findByKhoa_MaKhoa(String maKhoa);

    // Kiểm tra trùng lặp Email khi tạo mới giảng viên [cite: 260, 290]
    Optional<GiangVien> findByEmail(String email);
}