package com.jee.back.blog.controller;

import com.jee.back.blog.dto.PostBlogDTO;
import com.jee.back.blog.dto.TagDTO;
import com.jee.back.blog.entity.Blog;
import com.jee.back.blog.entity.Tags;
import com.jee.back.blog.repository.BlogRepository;
import com.jee.back.blog.repository.TagRepository;
import com.jee.back.blog.service.BlogService;
import com.jee.back.blog.service.CategoryService;
import com.jee.back.blog.service.TagService;
import com.jee.back.common.AuthenticatedUser;
import com.jee.back.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/blogs")
public class BlogController {

    private final BlogService blogService;
    private final BlogRepository blogRepository;
    private final CategoryService categoryService;
    private final TagService tagService;
    private final TagRepository tagRepository;

    @GetMapping("")
    public ResponseEntity<?> fetchAllBlogs() {
        List<Blog> allBlogs = blogRepository.findAll();
        return ResponseEntity.ok(allBlogs);
    }

    @PostMapping("")
    public ResponseEntity<?> postBlog(@RequestBody PostBlogDTO postBlogDTO) {
        HashMap<String, Object> responseMap = new HashMap<>();
        User user = AuthenticatedUser.fetchUserInfo();

        if (user == null) {
            responseMap.put("message", "user doesn't exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }

        /** set other details into the blogs*/
        LocalDateTime timeSet = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        Blog blog = new Blog();
        blog.setTitle(postBlogDTO.getTitle());
        blog.setContext(postBlogDTO.getContext());
        blog.setPublishedAt(timeSet);
        blog.setUpdatedAt(timeSet);
        blog.setVisibilityStatus("published");
        blog.setUser(user);

        List<Tags> blogTags = postBlogDTO.getTags().stream()
                .map(tagName -> tagRepository.findByTag(tagName)
                        .orElseGet(() -> {
                            Tags newTag = new Tags();
                            newTag.setTag(tagName);
                            return tagRepository.save(newTag); // save only new tags
                        })
                )
                .collect(Collectors.toList());

        blog.setTags(blogTags);
        Blog savedBlogInfo = blogService.saveBlog(blog); // Save blog w

        responseMap.put("message", savedBlogInfo != null ? "blog post success" : "blog post failed");
        return ResponseEntity.ok(responseMap);
    }
}
