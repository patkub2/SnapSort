package pl.polsl.snapsort.service.impl;

import org.springframework.stereotype.Service;
import pl.polsl.snapsort.models.Album;
import pl.polsl.snapsort.models.AlbumPhoto;
import pl.polsl.snapsort.models.Photo;
import pl.polsl.snapsort.repository.AlbumPhotoRepository;
import pl.polsl.snapsort.service.AlbumPhotoService;

@Service
public class AlbumPhotoServiceImpl implements AlbumPhotoService {
    private final AlbumPhotoRepository albumPhotoRepository;


    public AlbumPhotoServiceImpl(AlbumPhotoRepository albumPhotoRepository) {
        this.albumPhotoRepository = albumPhotoRepository;
    }

    public void deleteAlbumPhotosByAlbumId(Long albumId) {
        albumPhotoRepository.deleteAlbumPhotosByAlbumId(albumId);
    }

    public boolean existsPhotoInAlbum(Long photoId, Long albumId) {
        return albumPhotoRepository.existsByPhotoIdAndAlbumId(photoId, albumId);
    }
    public void addPhotoToAlbum(Album album, Photo photo) {
        AlbumPhoto albumPhoto = AlbumPhoto.builder()
                .album(album)
                .photo(photo)
                .build();
        albumPhotoRepository.save(albumPhoto);
    }

    public AlbumPhoto getAlbumPhotoByPhotoId(Long photoId) {
        return albumPhotoRepository.findByPhotoId(photoId);
    }

    public void removePhotoFromAlbum(Album album, Photo photo) {
        AlbumPhoto albumPhoto = albumPhotoRepository.findByAlbumAndPhoto(album, photo);
        if (albumPhoto != null) {
            albumPhotoRepository.delete(albumPhoto);
        }
    }
}
