package pl.polsl.snapsort.service;

import pl.polsl.snapsort.models.Photo;
import pl.polsl.snapsort.models.ThumbnailData;

import java.util.List;

public interface PhotoService {
    Photo createPhoto(Photo photo);

    ThumbnailData getThumbnailByPhotoId(Long id);

    Photo getPhotoById(Long id);

    List<byte[]> getAllThumbnailDataByUserIdAndAlbumId(Long userId, Long albumId);

    boolean existsPhotoByIdAndUserId(Long photoId, Long userId);

    List<byte[]> getAllThumbnailDataByUserId(Long userId);
}
