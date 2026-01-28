package com.uniit.trainingmanagement.service;

import com.uniit.trainingmanagement.entity.LopHocPhan;
import com.uniit.trainingmanagement.repository.LopHocPhanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LopHocPhanService {
    @Autowired private LopHocPhanRepository lopHocPhanRepository;

    public List<LopHocPhan> getLHPByHocKy(String hocKy, String namHoc) {
        return lopHocPhanRepository.findByHocKyAndNamHoc(hocKy, namHoc);
    }
}