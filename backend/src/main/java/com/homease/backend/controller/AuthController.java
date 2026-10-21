// package com.homease.backend.controller;

// import com.homease.backend.service.AuthService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     @Autowired
//     private AuthService authService;

//     @PostMapping("/request-otp")
//     public ResponseEntity<?> requestOtp(@RequestBody Map<String, String> payload) {
//         String email = payload.get("email");
//         try {
//             authService.requestOtp(email);
//             return ResponseEntity.ok(Map.of("success", true, "message", "OTP sent to your email"));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
//         }
//     }

//     @PostMapping("/signup")
//     public ResponseEntity<?> signup(@RequestBody Map<String, String> payload) {
//         String email = payload.get("email");
//         String password = payload.get("password");
//         String otp = payload.get("otp");
//         try {
//             String token = authService.signup(email, password, otp);
//             return ResponseEntity.ok(Map.of("success", true, "token", token, "message", "User created"));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
//         }
//     }

//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
//         String email = payload.get("email");
//         String password = payload.get("password");
//         try {
//             String token = authService.login(email, password);
//             return ResponseEntity.ok(Map.of("success", true, "token", token, "message", "Login successful"));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
//         }
//     }

//     @PostMapping("/reset-password")
//     public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> payload) {
//         String email = payload.get("email");
//         String otp = payload.get("otp");
//         String newPassword = payload.get("newPassword");
//         try {
//             boolean success = authService.resetPassword(email, otp, newPassword);
//             if (success) {
//                 return ResponseEntity.ok(Map.of("success", true, "message", "Password reset successful"));
//             } else {
//                 return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Reset failed"));
//             }
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
//         }
//     }
// }












package com.homease.backend.controller;

import com.homease.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // ── NEW: Simple register — email + password, no OTP ───────────────────────
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> payload) {
        String email    = payload.get("email");
        String password = payload.get("password");

        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Email is required"));
        }
        if (password == null || password.length() < 6) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Password must be at least 6 characters"));
        }

        try {
            String token = authService.register(email, password);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "token",   token,
                    "message", "Account created successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ── Login — unchanged ─────────────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email    = payload.get("email");
        String password = payload.get("password");
        try {
            String token = authService.login(email, password);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "token",   token,
                    "message", "Login successful"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ── Request OTP — only used for forgot password now ───────────────────────
    @PostMapping("/request-otp")
    public ResponseEntity<?> requestOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        try {
            authService.requestOtp(email);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "OTP sent to your email"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ── Reset Password — unchanged ────────────────────────────────────────────
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> payload) {
        String email       = payload.get("email");
        String otp         = payload.get("otp");
        String newPassword = payload.get("newPassword");
        try {
            boolean success = authService.resetPassword(email, otp, newPassword);
            if (success) {
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Password reset successfully"
                ));
            } else {
                return ResponseEntity.badRequest()
                        .body(Map.of("success", false, "message", "Password reset failed"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ── Old signup endpoint — kept so existing users aren't broken ────────────
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> payload) {
        String email    = payload.get("email");
        String password = payload.get("password");
        String otp      = payload.get("otp");
        try {
            String token = authService.signup(email, password, otp);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "token",   token,
                    "message", "User created"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}