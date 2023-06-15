package pl.polsl.snapsort.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.snapsort.models.Tag;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    // Additional query methods

    boolean existsByNameAndUserId(String name, Long userId);
    List<Tag> findAllByUserId(Long userId);
    Optional<Tag> findByName(String name);

    Optional<Tag> findByUserIdAndName(Long userId, String name);
}
