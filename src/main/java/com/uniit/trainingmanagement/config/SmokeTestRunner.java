package com.uniit.trainingmanagement.config;

import com.uniit.trainingmanagement.entity.SystemHealth;
import com.uniit.trainingmanagement.repository.SystemHealthRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Configuration
@Slf4j
public class SmokeTestRunner {

    @Bean
    CommandLineRunner runSmokeTest(SystemHealthRepository repository) {
        return args -> {
            log.info(">>> BAT DAU KIEM TRA KET NOI SQL SERVER...");
            try {
                // 1. Tao du lieu mau
                SystemHealth health = new SystemHealth(null, "BACKEND_SERVICE", "ACTIVE", LocalDateTime.now());
                
                // 2. Ghi vao SQL Server
                SystemHealth saved = repository.save(health);
                log.info(">>> Ghi du lieu thanh cong! ID: {}", saved.getId());

                // 3. Doc nguoc lai tu CSDL
                repository.findById(saved.getId()).ifPresent(h -> {
                    log.info(">>> Truy van thanh cong! Trang thai he thong: {}", h.getStatus());
                });

                log.info(">>> SMOKE TEST HOAN TAT: KET NOI THONG SUOT.");
            } catch (Exception e) {
                log.error(">>> LOI KET NOI SQL SERVER: {}", e.getMessage());
            }
        };
    }
}