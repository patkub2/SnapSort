package pl.polsl.snapsort.service.impl;

import org.springframework.stereotype.Service;
import pl.polsl.snapsort.models.PhotoData;
import pl.polsl.snapsort.repository.PhotoDataRepository;
import pl.polsl.snapsort.service.PhotoDataService;

import javax.persistence.EntityNotFoundException;

@Service
public class PhotoDataServiceImpl implements PhotoDataService {
    private final PhotoDataRepository photoDataRepository;

    public PhotoDataServiceImpl(PhotoDataRepository photoDataRepository) {
        this.photoDataRepository = photoDataRepository;
    }

    @Override
    public PhotoData savePhotoData(PhotoData photoData) {
        return photoDataRepository.save(photoData);
    }


    @Override
    public void deletePhotoData(Long photoDataId) {
        photoDataRepository.deleteById(photoDataId);
    }

    @Override
    public PhotoData getPhotoDataById(Long photoDataId) {
        return photoDataRepository.findById(photoDataId)
                .orElseThrow(() -> new EntityNotFoundException("PhotoData not found with id: " + photoDataId));
    }
    // Define methods to encapsulate photo data-related business logic
    // For example: savePhotoData, deletePhotoData, getPhotoDataById, etc.
    // You can use the photoDataRepository to perform CRUD operations on the PhotoData entity
}
