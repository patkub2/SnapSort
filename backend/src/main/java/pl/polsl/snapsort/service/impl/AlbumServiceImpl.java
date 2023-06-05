package pl.polsl.snapsort.service.impl;

import pl.polsl.snapsort.models.Album;
import pl.polsl.snapsort.repository.AlbumRepository;
import pl.polsl.snapsort.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;

    @Autowired
    public AlbumServiceImpl(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
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
}
