package pl.polsl.snapsort.service;

import org.springframework.beans.factory.annotation.Autowired;
import pl.polsl.snapsort.dto.UserDto;
import pl.polsl.snapsort.models.User;
import pl.polsl.snapsort.repository.UserRepository;

import java.util.List;

public interface UserService {
    List<UserDto> findAllUsers();


     User createUser(User user);

}
