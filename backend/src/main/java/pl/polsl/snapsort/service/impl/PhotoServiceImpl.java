package pl.polsl.snapsort.service.impl;

import org.springframework.stereotype.Service;
import pl.polsl.snapsort.models.Photo;
import pl.polsl.snapsort.repository.PhotoRepository;
import pl.polsl.snapsort.service.PhotoService;

import javax.persistence.EntityNotFoundException;

@Service
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepository photoRepository;

    public PhotoServiceImpl(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    // Define methods to encapsulate photo-related business logic
    // For example: createPhoto, updatePhoto, deletePhoto, getPhotoById, etc.
    // You can use the photoRepository to perform CRUD operations on the Photo entity

    public Photo createPhoto(Photo photo) {
        // Perform any additional business logic, if needed
        // For example, setting the upload date or generating a unique identifier

        // Save the photo using the repository
        return photoRepository.save(photo);
    }

    public Photo updatePhoto(Photo updatedPhoto) {
        // Check if the photo exists
        Photo existingPhoto = photoRepository.findById(updatedPhoto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Photo not found"));


        // Save the updated photo using the repository
        return photoRepository.save(existingPhoto);
    }

    public void deletePhoto(Long photoId) {
        // Check if the photo exists
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new EntityNotFoundException("Photo not found"));

        // Perform any additional business logic, if needed
        // For example, deleting associated photo data or thumbnail data

        // Delete the photo using the repository
        photoRepository.delete(photo);
    }

    public Photo getPhotoById(Long photoId) {
        // Retrieve the photo by its ID using the repository
        return photoRepository.findById(photoId)
                .orElseThrow(() -> new EntityNotFoundException("Photo not found"));
    }

}
