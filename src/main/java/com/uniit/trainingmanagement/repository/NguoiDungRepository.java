package com.uniit.trainingmanagement.repository;

import com.uniit.trainingmanagement.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NguoiDungRepository extends JpaRepository<NguoiDung, String> {}