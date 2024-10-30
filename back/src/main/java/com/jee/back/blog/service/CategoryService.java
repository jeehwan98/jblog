package com.jee.back.blog.service;

import com.jee.back.blog.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final ModelMapper modelMapper;
    private final CategoryRepository categoryRepository;
}
