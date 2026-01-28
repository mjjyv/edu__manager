package com.uniit.trainingmanagement.repository;

import com.uniit.trainingmanagement.entity.SystemHealth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemHealthRepository extends JpaRepository<SystemHealth, Long> {
}