package pl.polsl.snapsort.service;

import pl.polsl.snapsort.models.Photo;
import pl.polsl.snapsort.models.ThumbnailData;

import java.util.List;

public interface PhotoService {
    Photo createPhoto(Photo photo);

    ThumbnailData getThumbnailByPhotoId(Long id);

    Photo getPhotoById(Long id);


    boolean existsPhotoByIdAndUserId(Long photoId, Long userId);



    List<Photo> getPhotosByUserId(Long userId);

    List<Photo> getPhotosByUserIdAndAlbumId(Long userId, Long albumId);

    void deletePhoto(Photo photo);
}
