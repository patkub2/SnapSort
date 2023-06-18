package pl.polsl.snapsort.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String username;

    @JsonIgnore // Add this annotation
    @OneToMany(mappedBy = "user")
    private List<Photo> photos;

    @JsonIgnore // Add this annotation
    @OneToMany(mappedBy = "user")
    private List<Tag> tags;
    @JsonIgnore // Add this annotation
    @OneToMany(mappedBy = "user")
    private List<Album> albums;

    @Column(name = "is_new_user", columnDefinition = "boolean default true") // Set default value to true
    private boolean isNewUser = true;
}
