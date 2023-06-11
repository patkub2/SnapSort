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
@Table (name = "Photo_Tag")
public class PhotoTag {
    @EmbeddedId
    private PhotoTagId id;

    @ManyToOne
    @MapsId ("photoId")
    @JoinColumn(name = "photo_id")
    private Photo photo;

    @ManyToOne
    @MapsId("tagId")
    @JoinColumn(name = "tag_id")
    private Tag tag;
    // Constructors, getters, setters
}
