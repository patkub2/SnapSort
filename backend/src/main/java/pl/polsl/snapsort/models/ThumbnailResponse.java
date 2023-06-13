package pl.polsl.snapsort.models;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ThumbnailResponse {
    private Long photoId;
    private byte[] thumbnailData;

    public ThumbnailResponse(Long photoId, byte[] thumbnailData) {
        this.photoId = photoId;
        this.thumbnailData = thumbnailData;
    }

}
