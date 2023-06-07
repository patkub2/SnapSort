package pl.polsl.snapsort.service;

import pl.polsl.snapsort.models.Tag;

public interface TagService {
    Tag createTag(Tag tag);

    boolean existsTagByNameAndUserId(String name, Long userId);
}
