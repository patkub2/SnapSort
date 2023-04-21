package pl.polsl.snapsort.service;

import pl.polsl.snapsort.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> findAllUsers();
}
