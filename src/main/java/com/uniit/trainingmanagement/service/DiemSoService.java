package com.uniit.trainingmanagement.service;

import com.uniit.trainingmanagement.dto.BangDiemDTO;
import com.uniit.trainingmanagement.entity.DiemSo;
import com.uniit.trainingmanagement.repository.DiemSoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiemSoService {
    @Autowired private DiemSoRepository diemSoRepository;

    public List<BangDiemDTO> getBangDiemSinhVien(String maSV) {
        List<DiemSo> dsDiem = diemSoRepository.findBySinhVien_MaSV(maSV);
        return dsDiem.stream().map(d -> {
            BangDiemDTO dto = new BangDiemDTO();
            dto.setMaMH(d.getLopHocPhan().getMonHoc().getMaMH());
            dto.setTenMH(d.getLopHocPhan().getMonHoc().getTenMH());
            dto.setSoTinChi(d.getLopHocPhan().getMonHoc().getSoTinChi());
            dto.setDiemCC(d.getDiemCC());
            dto.setDiemGK(d.getDiemGK());
            dto.setDiemCK(d.getDiemCK());
            
            // Tính toán điểm hệ 10
            if (d.getDiemCC() != null && d.getDiemGK() != null && d.getDiemCK() != null) {
                double tk = (d.getDiemCC() * 0.1) + (d.getDiemGK() * 0.3) + (d.getDiemCK() * 0.6);
                dto.setDiemTongKet(Math.round(tk * 100.0) / 100.0);
            }
            return dto;
        }).collect(Collectors.toList());
    }

    public Double tinhGPA(String maSV) {
        List<BangDiemDTO> bangDiem = getBangDiemSinhVien(maSV);
        if (bangDiem.isEmpty()) return 0.0;

        double tongDiemHe4 = 0;
        int tongTinChi = 0;

        for (BangDiemDTO d : bangDiem) {
            if (d.getDiemTongKet() == null) continue;
            
            double he4;
            if (d.getDiemTongKet() >= 8.5) he4 = 4.0;
            else if (d.getDiemTongKet() >= 7.0) he4 = 3.0;
            else if (d.getDiemTongKet() >= 5.5) he4 = 2.0;
            else if (d.getDiemTongKet() >= 4.0) he4 = 1.0;
            else he4 = 0.0;

            tongDiemHe4 += he4 * d.getSoTinChi();
            tongTinChi += d.getSoTinChi();
        }

        return tongTinChi == 0 ? 0.0 : Math.round((tongDiemHe4 / tongTinChi) * 100.0) / 100.0;
    }
}