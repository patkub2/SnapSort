package pl.polsl.snapsort.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.polsl.snapsort.models.Album;
import pl.polsl.snapsort.models.AlbumPhoto;
import pl.polsl.snapsort.models.Photo;

import java.util.List;

@Repository
public interface AlbumPhotoRepository extends JpaRepository<AlbumPhoto, Long> {
    List<AlbumPhoto> findAllByAlbumId(Long albumId);

    boolean existsByPhotoIdAndAlbumId(Long photoId, Long albumId);

    void deleteAlbumPhotosByAlbumId(Long albumId);

    AlbumPhoto findByPhotoId(Long photoId);

    AlbumPhoto findByAlbumAndPhoto(Album album, Photo photo);
}
