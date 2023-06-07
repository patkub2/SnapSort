package pl.polsl.snapsort.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Album_Photo")
@IdClass(AlbumPhoto.AlbumPhotoId.class)
public class AlbumPhoto {

    @Id
    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album album;

    @Id
    @ManyToOne
    @JoinColumn(name = "photo_id")
    private Photo photo;

    // Constructors, getters, and setters

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AlbumPhotoId implements Serializable {
        private Long album;
        private Long photo;
    }
}