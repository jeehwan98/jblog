package com.jee.back.auth.dto;

import com.jee.back.user.entity.UserRole;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegisterDTO {
    private int id;
    private String userId;
    private String username;
    private String password;
    private UserRole role;
    private String imageUrl;
    private LocalDateTime createdDate;
    private String gender;
}
