package pl.polsl.snapsort.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtTokenUtil {
    String generateToken(UserDetails userDetails);
    boolean validateToken(String token);

    Long extractUserId(String token);
}
