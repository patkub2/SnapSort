package pl.polsl.snapsort.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.snapsort.models.PhotoTag;
import pl.polsl.snapsort.models.PhotoTagId;

@Repository
public interface PhotoTagRepository extends JpaRepository<PhotoTag, PhotoTagId> {
    // Additional query methods
}
