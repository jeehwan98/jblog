package com.jee.back.blog.dto;

import com.jee.back.user.entity.UserRole;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    private int id;
    private String userId;
    private String username;
    private String password;
    private String gender;
    private UserRole role;
    private String imageUrl;
    private List<BlogDTO> blogDTO;
}
