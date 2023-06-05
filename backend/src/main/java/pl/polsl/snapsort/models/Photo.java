package pl.polsl.snapsort.models;



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

    public void setDescription(String description) {
        this.description = description;
    }
}