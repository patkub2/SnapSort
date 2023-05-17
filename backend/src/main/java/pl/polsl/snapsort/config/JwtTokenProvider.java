package pl.polsl.snapsort.config;

import lombok.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import pl.polsl.snapsort.security.UserDetailsImpl;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value ("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpiration;

    public String generateToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration * 1000);

        return Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
}