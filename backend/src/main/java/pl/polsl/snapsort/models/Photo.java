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
@Table(name = "Photo")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "photo_data_id")
    private PhotoData photoData;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "thumbnail_data_id")
    private ThumbnailData thumbnailData;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @JsonIgnore // Add this annotation
    @OneToMany(mappedBy = "photo")
    private List<AlbumPhoto> albumPhotos;

    @JsonIgnore // Add this annotation
    @OneToMany(mappedBy = "photo")
    private List<PhotoTag> photoTags;

    public void setDescription(String description) {
        this.description = description;
    }


}