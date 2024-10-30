package com.jee.back.blog.service;

import com.jee.back.blog.dto.TagDTO;
import com.jee.back.blog.entity.Tags;
import com.jee.back.blog.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final ModelMapper modelMapper;

    public void saveTags(List<TagDTO> tagDTOList) {
        List<String> tagNames = tagDTOList.stream()
                        .map(TagDTO::getTag)
                        .collect(Collectors.toList());
        List<Tags> existingTags = tagRepository.findByTagIn(tagNames);

        Set<String> existingTagNames = existingTags.stream()
                .map(Tags::getTag)
                .collect(Collectors.toSet());

        List<Tags> newTags = tagDTOList.stream()
                .filter(tagDTO -> !existingTagNames.contains(tagDTO.getTag()))
                .map(tagDTO -> modelMapper.map(tagDTO, Tags.class))
                .collect(Collectors.toList());

        if (!newTags.isEmpty()) {
            tagRepository.saveAll(newTags);
            log.info("Saved new tags: {}", newTags);
        } else {
            log.info("No new tags to save");
        }

    }
}
