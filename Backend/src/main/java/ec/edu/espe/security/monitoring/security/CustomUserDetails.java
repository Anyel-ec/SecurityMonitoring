package ec.edu.espe.security.monitoring.security;

import ec.edu.espe.security.monitoring.models.UserInfo;
import ec.edu.espe.security.monitoring.models.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

public class CustomUserDetails extends UserInfo implements UserDetails {

    // Fields to store user-specific data
    private final String username;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    // Constructor that initializes fields based on a UserInfo instance
    public CustomUserDetails(UserInfo byUsername) {
        this.username = byUsername.getUsername();
        this.password = byUsername.getPassword();
        List<GrantedAuthority> auths = new ArrayList<>();

        // Converts each UserRole into a GrantedAuthority, adding it to the list
        for (UserRole role : byUsername.getRoles()) {
            auths.add(new SimpleGrantedAuthority(role.getName().toUpperCase()));
        }
        this.authorities = auths; // Sets the authorities list
    }

    // Returns the authorities granted to the user (user roles)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    // Returns the user's password
    @Override
    public String getPassword() {
        return password;
    }

    // Returns the user's username
    @Override
    public String getUsername() {
        return username;
    }

    // Indicates whether the user's account is non-expired (always true in this implementation)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // Indicates whether the user's account is non-locked (always true in this implementation)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // Indicates whether the user's credentials are non-expired (always true in this implementation)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // Indicates whether the user is enabled (always true in this implementation)
    @Override
    public boolean isEnabled() {
        return true;
    }

    // Overrides equals to compare user-specific fields
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        CustomUserDetails that = (CustomUserDetails) o;
        return Objects.equals(username, that.username) &&
                Objects.equals(password, that.password) &&
                Objects.equals(authorities, that.authorities);
    }

    // Overrides hashCode to generate a unique hash for this user
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), username, password, authorities);
    }
}
