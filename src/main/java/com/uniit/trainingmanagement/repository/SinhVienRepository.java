package com.uniit.trainingmanagement.repository;

import com.uniit.trainingmanagement.entity.SinhVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SinhVienRepository extends JpaRepository<SinhVien, String> {
    // Tìm sinh viên thuộc một lớp cụ thể [cite: 245]
    List<SinhVien> findByLopQuanLy_MaLop(String maLop);

    // Tìm kiếm sinh viên theo tên (gần đúng) phục vụ tra cứu [cite: 298]
    List<SinhVien> findByHoTenContainingIgnoreCase(String hoTen);
    
    // Đếm số lượng sinh viên trong một lớp
    long countByLopQuanLy_MaLop(String maLop);

    // Chỉ tìm sinh viên thuộc lớp và chưa bị xóa (trạng thái != DA_XOA)
    @Query("SELECT sv FROM SinhVien sv WHERE sv.lopQuanLy.maLop = :maLop AND (sv.trangThai IS NULL OR sv.trangThai <> 'DA_XOA')")
    List<SinhVien> findActiveStudentsByClass(@Param("maLop") String maLop);
}