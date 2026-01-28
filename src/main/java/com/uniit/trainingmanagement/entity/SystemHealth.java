package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sys_health_check")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemHealth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceName;
    private String status;
    private LocalDateTime checkedAt;
}