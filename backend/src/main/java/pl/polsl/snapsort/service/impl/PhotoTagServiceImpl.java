package pl.polsl.snapsort.service.impl;

import org.springframework.stereotype.Service;
import pl.polsl.snapsort.exceptions.PhotoNotFoundException;
import pl.polsl.snapsort.exceptions.TagAlreadyExistsException;
import pl.polsl.snapsort.exceptions.TagNotFoundException;
import pl.polsl.snapsort.models.Photo;
import pl.polsl.snapsort.models.PhotoTag;
import pl.polsl.snapsort.models.PhotoTagId;
import pl.polsl.snapsort.models.Tag;
import pl.polsl.snapsort.repository.PhotoRepository;
import pl.polsl.snapsort.repository.PhotoTagRepository;
import pl.polsl.snapsort.repository.TagRepository;
import pl.polsl.snapsort.service.PhotoTagService;

@Service
public class PhotoTagServiceImpl implements PhotoTagService {
    private final PhotoTagRepository photoTagRepository;

    private final PhotoRepository photoRepository;
    private final TagRepository tagRepository;

    public PhotoTagServiceImpl(PhotoTagRepository photoTagRepository, PhotoRepository photoRepository, TagRepository tagRepository) {
        this.photoTagRepository = photoTagRepository;
        this.photoRepository = photoRepository;
        this.tagRepository = tagRepository;
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
}
