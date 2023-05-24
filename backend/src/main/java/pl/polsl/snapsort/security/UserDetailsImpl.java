package pl.polsl.snapsort.security;

import org.springframework.security.core.GrantedAuthority;
import pl.polsl.snapsort.models.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {

    private final User user;

    public UserDetailsImpl(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // In this example, we assume there are no authorities for simplicity
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }


    public String getEmail() {
        return user.getEmail();
    }

    public Long getId() {
        return user.getId();
    }
    @Override
    public boolean isAccountNonExpired() {
        // In this example, we assume the user account never expires
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // In this example, we assume the user account is never locked
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // In this example, we assume the user credentials never expire
        return true;
    }

    @Override
    public boolean isEnabled() {
        // In this example, we assume the user is always enabled
        return true;
    }
}
