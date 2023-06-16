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
@Table(name = "Album", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "name"}))
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore // Add this annotation
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String name;


    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Album parent;

    @JsonIgnore // Add this annotation
    @OneToMany(mappedBy = "album")
    private List<AlbumPhoto> albumPhotos;
}
