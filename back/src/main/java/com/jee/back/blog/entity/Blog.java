package com.jee.back.blog.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "blog")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "blog_id")
    private int blogPostId;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "summary", nullable = false)
    private String summary;
    @Column(name = "context", nullable = false)
    private String context;
    @Column(name = "image_url", nullable = true)
    private String imageUrl;
    @Column(name = "visibility_status", nullable = false)
    private String visibilityStatus;
    @Column(name = "published_at", nullable = false)
    private LocalDateTime publishedAt;
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    @Column(name = "views_count", nullable = false)
    private int viewCount = 0;
    @Column(name = "likes_count", nullable = false)
    private int likesCount = 0;
}
