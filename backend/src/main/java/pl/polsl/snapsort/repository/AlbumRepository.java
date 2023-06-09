package pl.polsl.snapsort.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.snapsort.models.Album;

import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    boolean existsByNameAndUser_Id(String name, Long userId);
    boolean existsByNameAndUserId(String name, Long userId);
    List<Album> findAll();
    boolean existsByIdAndUserId(Long albumId, Long userId);

    List<Album> findAllByUserId(Long userId);
}
