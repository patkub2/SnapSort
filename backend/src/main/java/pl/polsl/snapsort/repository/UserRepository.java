package pl.polsl.snapsort.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.snapsort.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findByEmail(String email);

    User findByActivationCode(String code);

    User findByResetPasswordCode(String code);

    User findByUsernameAndPassword(String username, String password);

    User findByUsernameAndEmail(String username, String email);

    User findByUsernameAndActivationCode(String username, String code);

    User findByUsernameAndResetPasswordCode(String username, String code);

    User findByUsernameAndPasswordAndActivationCode(String username, String password, String code);

    User findByUsernameAndPasswordAndResetPasswordCode(String username, String password, String code);

    User findByUsernameAndPasswordAndEmail(String username, String password, String email);

    User findByUsernameAndPasswordAndActivationCodeAndResetPasswordCode(String username, String password, String code, String code2);

    User findByUsernameAndPasswordAndEmailAndActivationCode(String username, String password, String email, String code);

    User findByUsernameAndPasswordAndEmailAndResetPasswordCode(String username, String password, String email, String code);
}
