package pl.polsl.snapsort.service.impl;

import pl.polsl.snapsort.exceptions.AlbumNotFoundException;
import pl.polsl.snapsort.models.Album;
import pl.polsl.snapsort.models.AlbumPhoto;
import pl.polsl.snapsort.models.Photo;
import pl.polsl.snapsort.repository.AlbumPhotoRepository;
import pl.polsl.snapsort.repository.AlbumRepository;
import pl.polsl.snapsort.service.AlbumPhotoService;
import pl.polsl.snapsort.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;
    private final AlbumPhotoRepository albumPhotoRepository;

    private final AlbumPhotoService albumPhotoService;

    @Autowired
    public AlbumServiceImpl(AlbumRepository albumRepository, AlbumPhotoRepository albumPhotoRepository, AlbumPhotoService albumPhotoService) {
        this.albumRepository = albumRepository;
        this.albumPhotoRepository = albumPhotoRepository;
        this.albumPhotoService = albumPhotoService;
    }




    @Override
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    @Override
    public Optional<Album> getAlbumById(Long id) {
        return albumRepository.findById(id);
    }

    @Override
    public Album createAlbum(Album album) {
        return albumRepository.save(album);
    }

    @Override
    public Album updateAlbum(Album album) {
        return albumRepository.save(album);
    }


    @Override
    public void deleteAlbum(Long albumId) {
        // Check if the album exists
        Album album = getAlbumById(albumId).orElseThrow(() -> new AlbumNotFoundException("Album not found."));

        // Delete the album's connection to photos
        albumPhotoService.deleteAlbumPhotosByAlbumId(albumId);

        // Delete the album
        albumRepository.delete(album);
    }

    public boolean existsAlbumByNameAndUserId(String name, Long userId) {
        return albumRepository.existsByNameAndUserId(name, userId);
    }

    public List<Photo> getAlbumPhotos(Long albumId) {
        List<AlbumPhoto> albumPhotos = albumPhotoRepository.findAllByAlbumId(albumId);
        return albumPhotos.stream().map(AlbumPhoto::getPhoto).collect(Collectors.toList());
    }

    public boolean existsAlbumByIdAndUserId(Long albumId, Long userId) {
        return albumRepository.existsByIdAndUserId(albumId, userId);
    }

    @Override
    public List<Album> getAlbumsByUserId(Long userId) {
        return albumRepository.findAllByUserId(userId);
    }
}
