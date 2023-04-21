package pl.polsl.snapsort.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.snapsort.dto.UserDto;
import pl.polsl.snapsort.models.User;
import pl.polsl.snapsort.repository.UserRepository;
import pl.polsl.snapsort.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> mapToDto(user)).collect(Collectors.toList());
    }

    private UserDto mapToDto(User user) {
        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
        return userDto;
    }
}
