package pl.polsl.snapsort.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.snapsort.models.Tag;
import pl.polsl.snapsort.repository.TagRepository;
import pl.polsl.snapsort.service.TagService;

import java.util.List;

@Service
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;

    @Autowired
    public TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
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
}
