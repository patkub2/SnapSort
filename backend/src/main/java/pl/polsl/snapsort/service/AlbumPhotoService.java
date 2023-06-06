package pl.polsl.snapsort.service;

import pl.polsl.snapsort.models.Album;
import pl.polsl.snapsort.models.Photo;

public interface AlbumPhotoService {
    void addPhotoToAlbum(Album album, Photo photo);
}
