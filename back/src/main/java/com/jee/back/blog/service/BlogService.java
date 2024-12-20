package com.jee.back.blog.service;

import com.jee.back.blog.dto.PostBlogDTO;
import com.jee.back.blog.entity.Blog;
import com.jee.back.blog.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    private final ModelMapper modelMapper;

    public Blog saveBlog(Blog blog) {
        return blogRepository.save(blog);
    }
}
