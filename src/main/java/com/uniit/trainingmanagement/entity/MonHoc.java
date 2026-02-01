package com.uniit.trainingmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "mon_hoc")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonHoc {
    @Id
    @Column(name = "ma_mh", length = 10)
    private String maMH;

    @Column(name = "ten_mh", nullable = false)
    private String tenMH;

    @Column(name = "so_tin_chi")
    private Integer soTinChi;

    // Danh sách các môn tiên quyết của môn này
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "mon_hoc_tien_quyet",
        joinColumns = @JoinColumn(name = "ma_mh"),
        inverseJoinColumns = @JoinColumn(name = "ma_mh_tq")
    )
    @EqualsAndHashCode.Exclude 
    @ToString.Exclude
    private Set<MonHoc> monTienQuyet = new HashSet<>();
}