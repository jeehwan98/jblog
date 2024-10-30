package com.jee.back.blog.repository;

import com.jee.back.blog.entity.Tags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tags, Integer> {
    List<Tags> findByTagIn(List<String> tagNames);


    Optional<Tags> findByTag(String tagName);
}
