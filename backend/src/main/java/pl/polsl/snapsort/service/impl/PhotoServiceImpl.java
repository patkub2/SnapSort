package pl.polsl.snapsort.service.impl;

import org.springframework.stereotype.Service;
import pl.polsl.snapsort.models.Photo;
import pl.polsl.snapsort.models.ThumbnailData;
import pl.polsl.snapsort.repository.PhotoRepository;
import pl.polsl.snapsort.service.PhotoService;
import pl.polsl.snapsort.service.ThumbnailDataService;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepository photoRepository;
    private final ThumbnailDataService thumbnailDataService;

    public PhotoServiceImpl(PhotoRepository photoRepository, ThumbnailDataService thumbnailDataService) {
        this.photoRepository = photoRepository;
        this.thumbnailDataService = thumbnailDataService;
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
    @Override
    public ThumbnailData getThumbnailByPhotoId(Long id) {
        Photo photo = photoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Photo not found with id: " + id));

        return photo.getThumbnailData();
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

    public void deletePhoto(Photo photo) {
        photoRepository.delete(photo);
    }

    public boolean existsPhotoByIdAndUserId(Long photoId, Long userId) {
        return photoRepository.existsByIdAndUserId(photoId, userId);
    }

    @Override
    public List<Photo> getPhotosByUserId(Long userId) {
        return photoRepository.findByUserId(userId);
    }

    @Override
    public List<Photo> getPhotosByUserIdAndAlbumId(Long userId, Long albumId) {
        return photoRepository.findByUserIdAndAlbumId(userId, albumId);
    }
}
