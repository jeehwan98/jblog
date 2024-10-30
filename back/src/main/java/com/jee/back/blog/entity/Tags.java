package com.jee.back.blog.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tags")
public class Tags {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "tag_id")
    private int tagId;
    @Column(name = "tag")
    private String tag;
    @ManyToMany(mappedBy = "tags")
    private List<Blog> blogs;
}
