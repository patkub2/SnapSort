package pl.polsl.snapsort.service.impl;

import org.springframework.stereotype.Service;
import pl.polsl.snapsort.exceptions.PhotoNotFoundException;
import pl.polsl.snapsort.exceptions.TagAlreadyExistsException;
import pl.polsl.snapsort.exceptions.TagNotFoundException;
import pl.polsl.snapsort.models.*;
import pl.polsl.snapsort.repository.PhotoRepository;
import pl.polsl.snapsort.repository.PhotoTagRepository;
import pl.polsl.snapsort.repository.TagRepository;
import pl.polsl.snapsort.service.PhotoTagService;
import pl.polsl.snapsort.service.TagService;
import pl.polsl.snapsort.service.UserService;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class PhotoTagServiceImpl implements PhotoTagService {
    private final PhotoTagRepository photoTagRepository;

    private final PhotoRepository photoRepository;
    private final TagRepository tagRepository;
    private final UserService userService;
    private final TagService tagService;

    public PhotoTagServiceImpl(PhotoTagRepository photoTagRepository, PhotoRepository photoRepository, TagRepository tagRepository, UserService userService, TagService tagService) {
        this.photoTagRepository = photoTagRepository;
        this.photoRepository = photoRepository;
        this.tagRepository = tagRepository;
        this.userService = userService;
        this.tagService = tagService;
    }

    @Override
    public void addTagToPhoto(Long photoId, Long tagId) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new PhotoNotFoundException("Photo not found."));

        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new TagNotFoundException("Tag not found."));

        PhotoTagId photoTagId = new PhotoTagId(photoId, tagId);

        // Check if the photo already has the given tag
        boolean photoHasTag = photoTagRepository.existsById(photoTagId);
        if (photoHasTag) {
            throw new TagAlreadyExistsException("Tag already exists for the photo.");
        }

        PhotoTag photoTag = PhotoTag.builder()
                .id(photoTagId)
                .photo(photo)
                .tag(tag)
                .build();

        photoTagRepository.save(photoTag);
    }

    @Override
    public void addTagToPhoto(Long photoId, String tagName, Long userId) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new PhotoNotFoundException("Photo not found."));

        Tag tag = tagRepository.findByUserIdAndName(userId, tagName)
                .orElseGet(() -> createTag(tagName,userId));

        PhotoTagId photoTagId = new PhotoTagId(photoId, tag.getId());

        // Check if the photo already has the given tag
        boolean photoHasTag = photoTagRepository.existsById(photoTagId);
        if (photoHasTag) {
            throw new TagAlreadyExistsException("Tag already exists for the photo.");
        }

        PhotoTag photoTag = PhotoTag.builder()
                .id(photoTagId)
                .photo(photo)
                .tag(tag)
                .build();

        photoTagRepository.save(photoTag);
    }

    private Tag createTag(String tagName, Long userId) {
        Tag tag = new Tag(tagName);
        User user = userService.getUserById(userId);
        tag.setUser(user);

        return tagService.createTag(tag);
    }

    public void deletePhotoTag(PhotoTag photoTag) {
        photoTagRepository.delete(photoTag);
    }


    public List<PhotoTag> getTagsByPhotoId(Long photoId) {
        return photoTagRepository.findByPhotoId(photoId);
    }

}
