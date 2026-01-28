package com.uniit.trainingmanagement.controller;

import com.uniit.trainingmanagement.dto.AuthResponse;
import com.uniit.trainingmanagement.dto.LoginRequest;
import com.uniit.trainingmanagement.entity.NguoiDung;
import com.uniit.trainingmanagement.repository.NguoiDungRepository;
import com.uniit.trainingmanagement.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtTokenProvider tokenProvider;
    @Autowired private NguoiDungRepository nguoiDungRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    // 1. Đăng nhập và cấp Token
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // Xác thực người dùng qua Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getTenDangNhap(),
                        loginRequest.getMatKhau()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Tạo chuỗi JWT Token 
        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new AuthResponse(jwt, "Bearer"));
    }

    // 2. Tạo tài khoản mẫu cho hệ thống (Smoke Test Data)
    @PostMapping("/setup-samples")
    public ResponseEntity<String> setupSampleUsers() {
        if (nguoiDungRepository.count() == 0) {
            // Tài khoản Quản trị viên/Giáo vụ 
            nguoiDungRepository.save(new NguoiDung("admin", passwordEncoder.encode("admin123"), "ADMIN"));

            // Tài khoản Giảng viên [cite: 72]
            nguoiDungRepository.save(new NguoiDung("giangvien01", passwordEncoder.encode("gv123"), "GIANG_VIEN"));

            // Tài khoản Sinh viên [cite: 73]
            nguoiDungRepository.save(new NguoiDung("20210001", passwordEncoder.encode("sv123"), "SINH_VIEN"));

            return ResponseEntity.ok("Đã khởi tạo các tài khoản mẫu thành công.");
        }
        return ResponseEntity.badRequest().body("Dữ liệu người dùng đã tồn tại.");
    }
}