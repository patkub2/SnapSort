package pl.polsl.snapsort.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pl.polsl.snapsort.models.LoginRequest;
import pl.polsl.snapsort.models.LoginResponse;
import pl.polsl.snapsort.security.UserDetailsImpl;
import pl.polsl.snapsort.service.JwtTokenUtil;
import pl.polsl.snapsort.service.UserService;

@RestController
@CrossOrigin ("*")
@RequestMapping ("/api/auth")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    public LoginController(AuthenticationManager authenticationManager, UserService userService, JwtTokenUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Perform authentication using email and password
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), loginRequest.getPassword()));

            // Generate and return authentication token
            final UserDetails userDetails = userService.loadUserByEmail(loginRequest.getEmail());
            final String token = jwtTokenUtil.generateToken(userDetails);

            // Get additional user information
            String email = ((UserDetailsImpl) userDetails).getUser().getEmail();
            String username = userDetails.getUsername();

            // Create the login response object with the token and additional user information
            LoginResponse response = new LoginResponse(token, email, username);

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
