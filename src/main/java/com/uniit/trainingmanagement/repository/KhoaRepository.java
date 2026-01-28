package com.uniit.trainingmanagement.repository;

import com.uniit.trainingmanagement.entity.Khoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository layer cho thực thể Khoa.
 * JpaRepository cung cấp sẵn các phương thức: save(), findAll(), findById(), delete().
 */
@Repository
public interface KhoaRepository extends JpaRepository<Khoa, String> {
    // Có thể bổ sung các phương thức truy vấn tùy chỉnh tại đây
    // Ví dụ: List<Khoa> findByTenKhoaContaining(String ten);
}