package pl.polsl.snapsort.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.snapsort.models.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    // Additional query methods
}
