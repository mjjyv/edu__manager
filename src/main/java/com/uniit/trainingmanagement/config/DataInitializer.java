package com.uniit.trainingmanagement.config;

import com.uniit.trainingmanagement.entity.Khoa;
import com.uniit.trainingmanagement.repository.KhoaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(KhoaRepository khoaRepository) {
        return args -> {
            if (khoaRepository.count() == 0) {
                khoaRepository.save(new Khoa("FIT", "Cong nghe thong tin", "fit@uni.edu.vn", "0243111222", null, null));
                System.out.println(">>> Da khoi tao du lieu khoa mac dinh.");
            }
        };
    }
}