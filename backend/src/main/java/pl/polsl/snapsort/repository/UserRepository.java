package pl.polsl.snapsort.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.snapsort.models.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String url);
}

