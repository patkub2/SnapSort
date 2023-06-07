package pl.polsl.snapsort.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.snapsort.models.ThumbnailData;

@Repository
public interface ThumbnailDataRepository extends JpaRepository<ThumbnailData, Long> {
    // Add custom query methods or use default methods provided by JpaRepository
}