package com.jee.back.blog.dto;

import com.jee.back.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PostBlogDTO {

    private int blogId;
    private String title;
    private List<String> tags;
    private String context;
    private LocalDateTime publishedAt;
    private LocalDateTime updatedAt;
    private String visibilityStatus;
    private int viewCount;
    private int likesCount;

    private User user;

}
