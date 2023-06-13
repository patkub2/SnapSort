package pl.polsl.snapsort.service;

public interface PhotoTagService {
    void addTagToPhoto(Long photoId, Long tagId);
    void addTagToPhoto(Long photoId, String tagName,Long userId);


}
