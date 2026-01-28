package com.uniit.trainingmanagement.repository;

import com.uniit.trainingmanagement.entity.ChuyenNganh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChuyenNganhRepository extends JpaRepository<ChuyenNganh, String> {
    // Tìm danh sách chuyên ngành thuộc một khoa cụ thể [cite: 206]
    List<ChuyenNganh> findByKhoa_MaKhoa(String maKhoa);
}