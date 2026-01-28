package com.uniit.trainingmanagement.repository;

import com.uniit.trainingmanagement.entity.LopQuanLy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LopQuanLyRepository extends JpaRepository<LopQuanLy, String> {
    // Lọc lớp theo chuyên ngành để xếp lịch học [cite: 208]
    List<LopQuanLy> findByChuyenNganh_MaNganh(String maNganh);
}