package pl.polsl.snapsort.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.snapsort.models.Photo;
import pl.polsl.snapsort.models.PhotoTag;
import pl.polsl.snapsort.models.PhotoTagId;
import pl.polsl.snapsort.models.Tag;

@Repository
public interface PhotoTagRepository extends JpaRepository<PhotoTag, PhotoTagId> {
    // Additional query methods
    boolean existsByPhotoAndTag(Photo photo, Tag tag);
}
