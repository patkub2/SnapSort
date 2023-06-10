package pl.polsl.snapsort.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class PhotoTagId implements Serializable {
    @Column(name = "photo_id")
    private Long photoId;

    @Column(name = "tag_id")
    private Long tagId;

    // Constructors, equals, hashCode
}
