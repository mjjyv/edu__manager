package com.uniit.trainingmanagement.service;

import com.uniit.trainingmanagement.dto.*;
import com.uniit.trainingmanagement.entity.*;
import com.uniit.trainingmanagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingService {
    @Autowired private KhoaRepository khoaRepository;
    @Autowired private ChuyenNganhRepository chuyenNganhRepository;

    // --- QUẢN LÝ KHOA ---
    public List<KhoaDTO> getAllKhoa() {
        return khoaRepository.findAll().stream().map(k -> {
            KhoaDTO dto = new KhoaDTO();
            dto.setMaKhoa(k.getMaKhoa());
            dto.setTenKhoa(k.getTenKhoa());
            dto.setEmail(k.getEmail());
            dto.setDienThoai(k.getDienThoai());
            return dto;
        }).collect(Collectors.toList());
    }

    @Transactional
    public KhoaDTO saveKhoa(KhoaDTO dto) {
        Khoa k = new Khoa();
        k.setMaKhoa(dto.getMaKhoa());
        k.setTenKhoa(dto.getTenKhoa());
        k.setEmail(dto.getEmail());
        k.setDienThoai(dto.getDienThoai());
        khoaRepository.save(k);
        return dto;
    }
    
    public void deleteKhoa(String maKhoa) {
        if (!khoaRepository.existsById(maKhoa)) throw new RuntimeException("Khoa không tồn tại");
        try {
            khoaRepository.deleteById(maKhoa);
        } catch (Exception e) {
            throw new RuntimeException("Không thể xóa Khoa đã có dữ liệu ràng buộc (Ngành, Giảng viên).");
        }
    }

    // --- QUẢN LÝ CHUYÊN NGÀNH ---
    public List<ChuyenNganhDTO> getAllChuyenNganh() {
        return chuyenNganhRepository.findAll().stream().map(cn -> {
            ChuyenNganhDTO dto = new ChuyenNganhDTO();
            dto.setMaNganh(cn.getMaNganh());
            dto.setTenNganh(cn.getTenNganh());
            if (cn.getKhoa() != null) {
                dto.setMaKhoa(cn.getKhoa().getMaKhoa());
                dto.setTenKhoa(cn.getKhoa().getTenKhoa());
            }
            return dto;
        }).collect(Collectors.toList());
    }

    @Transactional
    public ChuyenNganhDTO saveChuyenNganh(ChuyenNganhDTO dto) {
        Khoa khoa = khoaRepository.findById(dto.getMaKhoa())
                .orElseThrow(() -> new RuntimeException("Khoa không tồn tại"));
        
        ChuyenNganh cn = new ChuyenNganh();
        cn.setMaNganh(dto.getMaNganh());
        cn.setTenNganh(dto.getTenNganh());
        cn.setKhoa(khoa);
        
        chuyenNganhRepository.save(cn);
        dto.setTenKhoa(khoa.getTenKhoa());
        return dto;
    }

    public void deleteChuyenNganh(String maNganh) {
         if (!chuyenNganhRepository.existsById(maNganh)) throw new RuntimeException("Chuyên ngành không tồn tại");
         try {
             chuyenNganhRepository.deleteById(maNganh);
         } catch (Exception e) {
             throw new RuntimeException("Không thể xóa Chuyên ngành đang có Lớp quản lý.");
         }
    }
}