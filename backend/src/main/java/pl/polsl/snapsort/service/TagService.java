package pl.polsl.snapsort.service;

import pl.polsl.snapsort.models.Tag;

import java.util.List;

public interface TagService {
    Tag createTag(Tag tag);

    boolean existsTagByNameAndUserId(String name, Long userId);

    List<Tag> getAllTagsByUserId(Long userId);
}
