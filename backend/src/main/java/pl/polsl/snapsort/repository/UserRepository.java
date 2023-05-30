package pl.polsl.snapsort.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.polsl.snapsort.dto.UserDto;
import pl.polsl.snapsort.models.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String url);
    Optional<User> findByEmail(String email);

    List<User> findAll();

    boolean existsByEmail(String email);
}

