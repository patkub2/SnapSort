package pl.polsl.snapsort.service;

import pl.polsl.snapsort.models.PhotoTag;

import java.util.List;

public interface PhotoTagService {
    void addTagToPhoto(Long photoId, Long tagId);
    void addTagToPhoto(Long photoId, String tagName,Long userId);


    List<PhotoTag> getTagsByPhotoId(Long id);

    void deletePhotoTag(PhotoTag photoTag);
}
