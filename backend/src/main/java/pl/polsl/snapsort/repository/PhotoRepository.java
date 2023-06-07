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

    @Query ("SELECT t.data FROM Photo p JOIN p.thumbnailData t WHERE p.user.id = :userId")
    List<byte[]> getAllThumbnailDataByUserId(@Param ("userId") Long userId);
}
