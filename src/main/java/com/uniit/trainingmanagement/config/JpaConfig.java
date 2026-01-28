package com.uniit.trainingmanagement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.uniit.trainingmanagement.repository")
public class JpaConfig {
    // Các Bean bổ sung cho Audit (như CreatedBy, LastModifiedBy) sẽ được định nghĩa tại đây ở các giai đoạn sau.
}