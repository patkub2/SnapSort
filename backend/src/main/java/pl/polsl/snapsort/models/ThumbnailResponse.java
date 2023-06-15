package pl.polsl.snapsort.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ThumbnailResponse {
    private Long photoId;
    private byte[] thumbnailData;

    private List<String> tags; // Add the tags field

    public ThumbnailResponse(Long photoId, byte[] thumbnailData,List<String> tags) {
        this.photoId = photoId;
        this.thumbnailData = thumbnailData;
        this.tags = tags;
    }

}
