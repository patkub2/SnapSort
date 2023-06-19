package pl.polsl.snapsort.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import pl.polsl.snapsort.dto.UserDto;
import pl.polsl.snapsort.models.User;
import pl.polsl.snapsort.service.JwtTokenUtil;
import pl.polsl.snapsort.service.UserService;

import java.util.List;



@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UserController {

    private final JwtTokenUtil jwtTokenUtil;
    private UserService userService;

    @Autowired
    public UserController(JwtTokenUtil jwtTokenUtil, UserService userService) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
    @GetMapping("")
    public ResponseEntity<List<UserDto>>  listUsers(Model model) {
        List<UserDto> users = userService.findAllUsers();
        model.addAttribute("users", users);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        User existingUser = userService.getUserById(id);
        if (existingUser == null) {
            return null;
        }
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setUsername(user.getUsername());
        return userService.saveUserHash(existingUser);
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.saveUserHash(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists.");
        }

        User createdUser = userService.saveUserHash(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // New endpoint to check if the logged user is a new user
    @GetMapping("/isNewUser")
    public ResponseEntity<Boolean> checkIfNewUser(@RequestHeader ("Authorization") String token) {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        boolean isNewUser = user.isNewUser(); // Assuming there's a method in the User class to check if it's a new user
        return ResponseEntity.ok(isNewUser);
    }

    // New endpoint to change the isNewUser status of a user
    @PostMapping("/changeNewUserStatus")
    public ResponseEntity<String> changeNewUserStatus(
            @RequestHeader("Authorization") String token,
            @RequestParam("isNewUser") boolean isNewUser) {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        user.setNewUser(isNewUser);
        User updatedUser = userService.saveUser(user);

        if (updatedUser != null) {
            return ResponseEntity.ok("New user status changed successfully to: " + isNewUser);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to change new user status.");
        }
    }


}
