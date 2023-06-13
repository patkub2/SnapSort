package pl.polsl.snapsort.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.polsl.snapsort.models.Photo;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    // Add custom query methods or use default methods provided by JpaRepository
    boolean existsByIdAndUserId(Long photoId, Long userId);

    @Query("SELECT p FROM Photo p WHERE p.user.id = :userId")
    List<Photo> findByUserId(@Param("userId") Long userId);

    @Query("SELECT p FROM Photo p JOIN p.albumPhotos ap WHERE p.user.id = :userId AND ap.album.id = :albumId")
    List<Photo> findByUserIdAndAlbumId(@Param("userId") Long userId, @Param("albumId") Long albumId);
}
