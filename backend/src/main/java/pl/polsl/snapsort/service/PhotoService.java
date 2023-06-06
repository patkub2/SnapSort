package pl.polsl.snapsort.service;

import pl.polsl.snapsort.models.Photo;
import pl.polsl.snapsort.models.ThumbnailData;

public interface PhotoService {
    Photo createPhoto(Photo photo);

    ThumbnailData getThumbnailByPhotoId(Long id);

    Photo getPhotoById(Long id);

    boolean existsPhotoByIdAndUserId(Long photoId, Long userId);
}
