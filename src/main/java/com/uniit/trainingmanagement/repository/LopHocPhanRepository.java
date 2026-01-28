package com.uniit.trainingmanagement.repository;

import com.uniit.trainingmanagement.entity.LopHocPhan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LopHocPhanRepository extends JpaRepository<LopHocPhan, String> {
    // Lấy danh sách lớp học phần mở trong một học kỳ và năm học cụ thể [cite: 57, 216]
    List<LopHocPhan> findByHocKyAndNamHoc(String hocKy, String namHoc);

    // Xem lịch giảng dạy của một giảng viên cụ thể [cite: 72]
    List<LopHocPhan> findByGiangVien_MaGV(String maGV);
    
    // Tìm các lớp của một môn học
    List<LopHocPhan> findByMonHoc_MaMH(String maMH);
}