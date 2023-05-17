package pl.polsl.snapsort.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.snapsort.models.Album;
import pl.polsl.snapsort.models.Album;

import java.util.List;
import java.util.Optional;

public interface AlbumRepository extends JpaRepository<Album, Long> {


    List<Album> findAll();

}
