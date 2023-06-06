package pl.polsl.snapsort.service.impl;

import pl.polsl.snapsort.models.Album;
import pl.polsl.snapsort.models.AlbumPhoto;
import pl.polsl.snapsort.models.Photo;
import pl.polsl.snapsort.repository.AlbumPhotoRepository;
import pl.polsl.snapsort.repository.AlbumRepository;
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

    @Autowired
    public AlbumServiceImpl(AlbumRepository albumRepository, AlbumPhotoRepository albumPhotoRepository) {
        this.albumRepository = albumRepository;
        this.albumPhotoRepository = albumPhotoRepository;
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
    public void deleteAlbum(Long id) {
        albumRepository.deleteById(id);
    }

    public boolean existsAlbumByNameAndUserId(String name, Long userId) {
        return albumRepository.existsByNameAndUserId(name, userId);
    }

    public List<Photo> getAlbumPhotos(Long albumId) {
        List<AlbumPhoto> albumPhotos = albumPhotoRepository.findAllByAlbumId(albumId);
        return albumPhotos.stream().map(AlbumPhoto::getPhoto).collect(Collectors.toList());
    }
}
