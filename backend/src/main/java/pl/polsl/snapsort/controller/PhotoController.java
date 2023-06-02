package pl.polsl.snapsort.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.snapsort.models.Photo;
import pl.polsl.snapsort.models.PhotoData;
import pl.polsl.snapsort.models.ThumbnailData;
import pl.polsl.snapsort.service.PhotoDataService;
import pl.polsl.snapsort.service.PhotoService;
import pl.polsl.snapsort.service.ThumbnailDataService;

import java.io.IOException;

@RestController
@RequestMapping ("/photos")
public class PhotoController {
    private final PhotoService photoService;
    private final PhotoDataService photoDataService;
    private final ThumbnailDataService thumbnailDataService;

    public PhotoController(PhotoService photoService, PhotoDataService photoDataService, ThumbnailDataService thumbnailDataService) {
        this.photoService = photoService;
        this.photoDataService = photoDataService;
        this.thumbnailDataService = thumbnailDataService;
    }

    // Endpoint methods will be implemented here
    @PostMapping ("/upload")
    public ResponseEntity<Photo> uploadPhoto(@RequestParam ("file") MultipartFile file, @RequestParam("description") String description) {
        try {
            // Create a new PhotoData entity and save the photo data
            PhotoData photoData = new PhotoData(file.getBytes());
            photoData = photoDataService.savePhotoData(photoData);

            // Generate the thumbnail data
            byte[] thumbnailData = generateThumbnail(file);

            // Create a new ThumbnailData entity and save the thumbnail data
            ThumbnailData thumbnail = new ThumbnailData(thumbnailData);
            thumbnail = thumbnailDataService.saveThumbnailData(thumbnail);

            // Create a new Photo entity and associate it with the PhotoData and ThumbnailData entities
            Photo photo = new Photo();
            photo.setDescription(description);
            photo.setPhotoData(photoData);
            photo.setThumbnailData(thumbnail);

            // Save the Photo entity in the Photo table
            photo = photoService.createPhoto(photo);

            return ResponseEntity.ok(photo);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private byte[] generateThumbnail(MultipartFile file) {
    }
}
