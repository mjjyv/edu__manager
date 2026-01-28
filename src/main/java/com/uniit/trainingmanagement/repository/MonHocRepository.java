package com.uniit.trainingmanagement.repository;

import com.uniit.trainingmanagement.entity.MonHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MonHocRepository extends JpaRepository<MonHoc, String> {
    // Tìm môn học theo tên (ví dụ: tìm tất cả môn "Lập trình")
    List<MonHoc> findByTenMHContainingIgnoreCase(String tenMH);
}