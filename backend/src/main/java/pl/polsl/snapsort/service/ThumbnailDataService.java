package pl.polsl.snapsort.service;

import pl.polsl.snapsort.models.ThumbnailData;

public interface ThumbnailDataService {
    ThumbnailData saveThumbnailData(ThumbnailData thumbnail);

    void deleteThumbnailData(Long thumbnailDataId);

    ThumbnailData getThumbnailDataById(Long thumbnailDataId);
}
