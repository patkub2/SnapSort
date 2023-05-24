package pl.polsl.snapsort.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import pl.polsl.snapsort.dto.UserDto;
import pl.polsl.snapsort.models.User;
import pl.polsl.snapsort.repository.UserRepository;

import java.util.List;

public interface UserService {


    List<UserDto> findAllUsers();

    List<User> getAllUsers();
    User getUserById(Long id);
    User saveUser(User user);

    User getUserByUsername(String username);

    void deleteUser(Long id);

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    UserDetails loadUserByEmail(String email)  throws UsernameNotFoundException;;
}
