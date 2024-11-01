package com.jee.back.auth.controller;

import com.jee.back.auth.dto.LoginDTO;
import com.jee.back.auth.dto.RegisterDTO;
import com.jee.back.auth.service.UserDetailsImpl;
import com.jee.back.auth.util.JwtTokenUtil;
import com.jee.back.user.entity.User;
import com.jee.back.user.entity.UserRole;
import com.jee.back.user.repository.UserRepository;
import com.jee.back.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO, HttpServletRequest request) {
        log.info("inputted loginDTO: {}", loginDTO);
        HashMap<String, Object> responseMap = new HashMap<>();
        Optional<User> userExists = userRepository.findUserByUserId(loginDTO.getUserId());
        if (userExists.isEmpty()) {
            responseMap.put("error", "userId doesn't exist");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), userExists.get().getPassword())) {
            responseMap.put("error", "invalid password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
        }

        User user = userExists.get();
        String token = jwtTokenUtil.generateToken(user);

        ResponseCookie jwtCookie = ResponseCookie.from("accessToken", token)
                .path("/")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .maxAge(Duration.ofMinutes(180))
                .build();

        UserDetailsImpl userDetails = new UserDetailsImpl(user);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, user.getRole().getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        responseMap.put("message", "login success");

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .contentType(MediaType.APPLICATION_JSON)
                .body(responseMap);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        HashMap<String, Object> responseMap = new HashMap<>();

        ResponseCookie deleteCookie = ResponseCookie.from("accessToken")
                .path("/")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .maxAge(0)
                .build();

        responseMap.put("message", "logout success");
        log.info("" + responseMap);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                .contentType(MediaType.APPLICATION_JSON)
                .body(responseMap);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody RegisterDTO registerDTO) {
        Map<String, String> responseMap = new HashMap<>();
        Optional<User> registerUser = userRepository.findUserByUserId(registerDTO.getUserId());
        if (registerUser.isPresent()) {
            responseMap.put("message", "userId is already taken");
            System.out.println("userId already exists...");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
        }

        String encodedPassword = passwordEncoder.encode(registerDTO.getPassword());
        registerDTO.setPassword(encodedPassword);
        registerDTO.setRole(UserRole.USER);

        registerDTO.setCreatedDate(LocalDateTime.now());
        User user = userService.registerUser(registerDTO);

        if (user == null) {
            responseMap.put("error", "register failed");
        }
        responseMap.put("message", "register success");
        return ResponseEntity.ok().body(responseMap);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok().body("logout completed");
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> checkLoggedInUser(@PathVariable("userId") String userId) {
        HashMap<String, Object> responseMap = new HashMap<>();
        Optional<User> userExists = userRepository.findUserByUserId(userId);

        if (userExists.isEmpty()) {
            responseMap.put("message", "userId is null");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
        }

        User user = userExists.get();
        responseMap.put("message", user);
        return ResponseEntity.ok(responseMap);
    }
}
