package pl.polsl.snapsort.service;

import pl.polsl.snapsort.models.Tag;

import java.util.List;

public interface TagService {
    Tag createTag(Tag tag);

    boolean existsTagByNameAndUserId(String name, Long userId);
    Tag createTag(String tagName);
    List<Tag> getAllTagsByUserId(Long userId);

    void deleteTagById(Long tagId);

    Tag getTagById(Long tagId);
}
