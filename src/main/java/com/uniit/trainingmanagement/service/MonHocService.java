package com.uniit.trainingmanagement.service;

import com.uniit.trainingmanagement.dto.MonHocDTO;
import com.uniit.trainingmanagement.entity.MonHoc;
import com.uniit.trainingmanagement.repository.MonHocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MonHocService {
    @Autowired private MonHocRepository monHocRepository;

    // Lấy tất cả môn học (Convert sang DTO)
    public List<MonHocDTO> getAll() {
        return monHocRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    // Thêm mới hoặc Cập nhật
    @Transactional
    public MonHocDTO save(MonHocDTO dto) {
        MonHoc mh = monHocRepository.findById(dto.getMaMH()).orElse(new MonHoc());
        
        mh.setMaMH(dto.getMaMH());
        mh.setTenMH(dto.getTenMH());
        mh.setSoTinChi(dto.getSoTinChi());

        // Xử lý môn tiên quyết
        if (dto.getMaMonTienQuyet() != null && !dto.getMaMonTienQuyet().isEmpty()) {
            List<MonHoc> prereqs = monHocRepository.findAllById(dto.getMaMonTienQuyet());
            mh.setMonTienQuyet(new HashSet<>(prereqs));
        } else {
            mh.getMonTienQuyet().clear();
        }

        return toDTO(monHocRepository.save(mh));
    }
    
    // Xóa môn học
    public void delete(String maMH) {
        if (!monHocRepository.existsById(maMH)) {
            throw new RuntimeException("Môn học không tồn tại");
        }
        monHocRepository.deleteById(maMH);
    }

    private MonHocDTO toDTO(MonHoc entity) {
        MonHocDTO dto = new MonHocDTO();
        dto.setMaMH(entity.getMaMH());
        dto.setTenMH(entity.getTenMH());
        dto.setSoTinChi(entity.getSoTinChi());
        dto.setMaMonTienQuyet(entity.getMonTienQuyet().stream()
                .map(MonHoc::getMaMH).collect(Collectors.toList()));
        return dto;
    }
}