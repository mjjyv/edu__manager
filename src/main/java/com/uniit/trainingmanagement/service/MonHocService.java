package com.uniit.trainingmanagement.service;

import com.uniit.trainingmanagement.entity.MonHoc;
import com.uniit.trainingmanagement.repository.MonHocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MonHocService {
    @Autowired private MonHocRepository monHocRepository;

    public List<MonHoc> getAllMonHoc() {
        return monHocRepository.findAll();
    }

    public MonHoc saveMonHoc(MonHoc monHoc) {
        return monHocRepository.save(monHoc);
    }
}