package pl.polsl.snapsort.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.snapsort.exceptions.TagNotFoundException;
import pl.polsl.snapsort.exceptions.UnauthorizedTagAccessException;
import pl.polsl.snapsort.models.PhotoTag;
import pl.polsl.snapsort.models.Tag;
import pl.polsl.snapsort.repository.PhotoTagRepository;
import pl.polsl.snapsort.repository.TagRepository;
import pl.polsl.snapsort.service.TagService;

import java.util.List;

@Service
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;
    private final PhotoTagRepository photoTagRepository;

    @Autowired
    public TagServiceImpl(TagRepository tagRepository, PhotoTagRepository photoTagRepository) {
        this.tagRepository = tagRepository;
        this.photoTagRepository = photoTagRepository;
    }

    public Tag createTag(Tag tag) {
        return tagRepository.save(tag);
    }

    public Tag createTag(String tagName) {
        Tag tag = new Tag(tagName);
        return tagRepository.save(tag);
    }
    public boolean existsTagByNameAndUserId(String name, Long userId) {
        return tagRepository.existsByNameAndUserId(name, userId);
    }

    public List<Tag> getAllTagsByUserId(Long userId) {
        return tagRepository.findAllByUserId(userId);
    }

    public void deleteTagById(Long tagId) {
        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new TagNotFoundException("Tag not found."));

        // Delete tag connections with photos
        List<PhotoTag> photoTags = photoTagRepository.findByTagId(tagId);
        photoTagRepository.deleteAll(photoTags);

        // Delete the tag itself
        tagRepository.delete(tag);
    }

    public Tag getTagById(Long tagId) {
        return tagRepository.findById(tagId)
                .orElseThrow(() -> new TagNotFoundException("Tag not found."));
    }


}
