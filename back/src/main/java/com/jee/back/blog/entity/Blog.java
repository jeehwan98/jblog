package com.jee.back.blog.entity;

import com.jee.back.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @Column(name = "status", nullable = false)
    private String status = "draft"; // draft : 임시 저장, published : 출간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToMany
    @JoinTable(
            name = "blog_tags",
            joinColumns = @JoinColumn(name = "blog_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tags> tags = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(
            mappedBy = "blog",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Comments> comments = new ArrayList<>();
}
