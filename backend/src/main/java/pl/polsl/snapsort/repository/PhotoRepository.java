package pl.polsl.snapsort.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.snapsort.models.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    // Add custom query methods or use default methods provided by JpaRepository
    boolean existsByIdAndUserId(Long photoId, Long userId);
}
