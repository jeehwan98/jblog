package com.jee.back.user.entity;

import com.jee.back.blog.entity.Blog;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "user_info")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;
    @Column(name = "user_id", nullable = false)
    private String userId;
    @Column(name = "username", nullable = false)
    private String username;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "gender", nullable = false)
    private String gender;
    @Column(name = "role", nullable = false, length = 10)
    @Enumerated(value = EnumType.STRING)
    private UserRole role;
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;
    @Column(name = "image_url", nullable = true)
    private String imageUrl;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER
    )
    private List<Blog> blogs;
}