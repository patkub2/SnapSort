package pl.polsl.snapsort.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Tag", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "name"}))
public class Tag {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @JsonIgnore // Add this annotation
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Tag(String name) {
        this.name = name;
    }
    // Constructors, getters, setters
}
