package com.jee.back.blog.controller;

import com.jee.back.blog.entity.Blog;
import com.jee.back.blog.repository.BlogRepository;
import com.jee.back.blog.service.BlogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/blogs")
public class BlogController {

    private final BlogService blogService;
    private final BlogRepository blogRepository;

    @GetMapping("")
    public ResponseEntity<?> fetchAllBlogs() {
        List<Blog> allBlogs = blogRepository.findAll();
        return ResponseEntity.ok(allBlogs);
    }
}
