package pl.polsl.snapsort.service;

import pl.polsl.snapsort.models.Album;
import pl.polsl.snapsort.models.AlbumPhoto;
import pl.polsl.snapsort.models.Photo;

public interface AlbumPhotoService {
    void addPhotoToAlbum(Album album, Photo photo);

    boolean existsPhotoInAlbum(Long photoId, Long albumId);


    void deleteAlbumPhotosByAlbumId(Long albumId);

    AlbumPhoto getAlbumPhotoByPhotoId(Long photoId);

    void removePhotoFromAlbum(Album album, Photo photo);
}
