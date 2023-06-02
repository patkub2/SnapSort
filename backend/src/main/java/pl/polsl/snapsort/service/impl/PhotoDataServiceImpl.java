package pl.polsl.snapsort.service.impl;

import org.springframework.stereotype.Service;
import pl.polsl.snapsort.repository.PhotoDataRepository;

@Service
public class PhotoDataServiceImpl {
    private final PhotoDataRepository photoDataRepository;

    public PhotoDataServiceImpl(PhotoDataRepository photoDataRepository) {
        this.photoDataRepository = photoDataRepository;
    }

    // Define methods to encapsulate photo data-related business logic
    // For example: savePhotoData, deletePhotoData, getPhotoDataById, etc.
    // You can use the photoDataRepository to perform CRUD operations on the PhotoData entity
}
