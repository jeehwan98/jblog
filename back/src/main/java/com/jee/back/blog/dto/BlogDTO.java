package com.jee.back.blog.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BlogDTO {

    private int blogPostId;
    private String title;
    private String summary;
    private String context;
    private String imageUrl;
    private String visibilityStatus;
    private LocalDateTime publishedAt;
    private LocalDateTime updatedAt;
    private int viewCount;
    private int likesCount;
    private String status = "draft";
    private UserDTO userDTO;
//    private List<TagsDTO> tagsDTO;
//    private CategoryDTO categoryDTO;
}
