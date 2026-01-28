package com.uniit.trainingmanagement.repository;

import com.uniit.trainingmanagement.entity.DiemSo;
import com.uniit.trainingmanagement.entity.DiemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository cho bảng Điểm.
 * Lưu ý: ID là DiemId (Composite Key) bao gồm maSV và maLHP[cite: 253, 254].
 */
@Repository
public interface DiemSoRepository extends JpaRepository<DiemSo, DiemId> {
    // Lấy bảng điểm tất cả các môn của một sinh viên để tính GPA/CPA [cite: 61]
    List<DiemSo> findBySinhVien_MaSV(String maSV);

    // Lấy bảng điểm của một lớp học phần cụ thể để giảng viên nhập điểm [cite: 72]
    List<DiemSo> findByLopHocPhan_MaLHP(String maLHP);
}