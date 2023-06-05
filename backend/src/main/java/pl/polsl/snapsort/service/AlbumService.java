package pl.polsl.snapsort.service;


import pl.polsl.snapsort.models.Album;

import java.util.List;
import java.util.Optional;

public interface AlbumService {


    List<Album> getAllAlbums();
    Optional<Album> getAlbumById(Long id);
    Album createAlbum(Album album);
    Album updateAlbum(Album album);
    void deleteAlbum(Long id);

    boolean existsAlbumByNameAndUserId(String name, Long userId);
}
