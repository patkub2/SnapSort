package pl.polsl.snapsort.service.impl;

import org.springframework.stereotype.Service;
import pl.polsl.snapsort.repository.ThumbnailDataRepository;

@Service
public class ThumbnailDataServiceImpl {
    private final ThumbnailDataRepository thumbnailDataRepository;

    public ThumbnailDataServiceImpl(ThumbnailDataRepository thumbnailDataRepository) {
        this.thumbnailDataRepository = thumbnailDataRepository;
    }

    // Define methods to encapsulate thumbnail data-related business logic
    // For example: saveThumbnailData, deleteThumbnailData, getThumbnailDataById, etc.
    // You can use the thumbnailDataRepository to perform CRUD operations on the ThumbnailData entity
}
