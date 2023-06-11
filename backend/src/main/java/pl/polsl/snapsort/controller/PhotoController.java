package pl.polsl.snapsort.controller;

import javax.imageio.ImageIO;
import javax.persistence.EntityNotFoundException;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.snapsort.exceptions.AlbumNotFoundException;
import pl.polsl.snapsort.models.*;
import pl.polsl.snapsort.service.*;


@RestController
@CrossOrigin("*")
@RequestMapping ("/photos")
public class PhotoController {

    private final PhotoService photoService;
    private final PhotoDataService photoDataService;
    private final ThumbnailDataService thumbnailDataService;
    private final UserService userService;
    private final PhotoTagService photoTagService;
    private final AlbumService albumService;
    private final AlbumPhotoService albumPhotoService;
    private final JwtTokenUtil jwtTokenUtil;

    public PhotoController(PhotoService photoService, PhotoDataService photoDataService,
                           ThumbnailDataService thumbnailDataService, UserService userService,
                           PhotoTagService photoTagService, AlbumService albumService,
                           AlbumPhotoService albumPhotoService, JwtTokenUtil jwtTokenUtil) {
        this.photoService = photoService;
        this.photoDataService = photoDataService;
        this.thumbnailDataService = thumbnailDataService;
        this.userService = userService;
        this.photoTagService = photoTagService;
        this.albumService = albumService;
        this.albumPhotoService = albumPhotoService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/upload/multiple")
    public ResponseEntity<List<Photo>> uploadPhotos(
            @RequestHeader(value = "Authorization") String authorizationHeader,
            @RequestParam("files") MultipartFile[] files,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "tags", required = false) List<String> tags,
            @RequestParam(value = "albumId", required = false) Long albumId
    ) {
        try {
            // Extract the token from the Authorization header
            String token = authorizationHeader.substring("Bearer ".length());

            // Validate the token and extract the user ID
            Long userId = jwtTokenUtil.extractUserId(token);

            // Retrieve the user from the database based on the user ID
            User user = userService.getUserById(userId);

            // Create a new list to store the created photos
            List<Photo> createdPhotos = new ArrayList<>();

            // Iterate over the uploaded files
            for (MultipartFile file : files) {
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
                photo.setUser(user);

                // Save the Photo entity in the Photo table
                photo = photoService.createPhoto(photo);

                // If tags are provided, add them to the photo
                if (tags != null && !tags.isEmpty()) {
                    for (String tagName : tags) {
                        photoTagService.addTagToPhoto(photo.getId(), tagName, userId);
                    }
                }
                boolean albumBelongsToUser = albumService.existsAlbumByIdAndUserId(albumId, userId);
                if (!albumBelongsToUser) {
                    throw new AlbumNotFoundException("Album not found or does not belong to the user.");
                }

                // If an album ID is provided, associate the photo with the album
                if (albumId != null) {
                    Album album = albumService.getAlbumById(albumId)
                            .orElseThrow(() -> new EntityNotFoundException("Album not found."));
                    albumPhotoService.addPhotoToAlbum(album, photo);
                }

                // Add the created photo to the list
                createdPhotos.add(photo);
            }

            return ResponseEntity.ok(createdPhotos);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    // Endpoint methods will be implemented here
    @PostMapping("/upload")
    public ResponseEntity<Photo> uploadPhoto(
            @RequestHeader(value = "Authorization") String authorizationHeader,
            @RequestParam("file") MultipartFile file,
            @RequestParam("description") String description
    ) {
        try {
            // Extract the token from the Authorization header
            String token = authorizationHeader.substring("Bearer ".length());

            // Validate the token and extract the user ID
            Long userId = jwtTokenUtil.extractUserId(token);

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

            // Retrieve the user from the database based on the user ID
            User user = userService.getUserById(userId);

            // Set the user for the photo
            photo.setUser(user);

            // Save the Photo entity in the Photo table
            photo = photoService.createPhoto(photo);

            return ResponseEntity.ok(photo);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("album/{albumId}/thumbnails")
    public List<byte[]> getAllThumbnailDataForUserAndAlbum(@RequestHeader("Authorization") String token, @PathVariable Long albumId) {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));
        return photoService.getAllThumbnailDataByUserIdAndAlbumId(userId,albumId);
    }

    @GetMapping("/thumbnails")
    public List<byte[]> getAllThumbnailDataForUser(@RequestHeader("Authorization") String token) {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));
        return photoService.getAllThumbnailDataByUserId(userId);
    }
    // Endpoint to fetch a specific photo by ID
    @GetMapping ("/{id}")
    public ResponseEntity<Photo> getPhoto(@PathVariable Long id) {
        try {
            Photo photo = photoService.getPhotoById(id);
            return ResponseEntity.ok(photo);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to fetch the thumbnail of a specific photo by ID
    @GetMapping("/{id}/thumbnail")
    public ResponseEntity<ThumbnailData> getPhotoThumbnail(@PathVariable Long id) {
        try {
            ThumbnailData thumbnail = photoService.getThumbnailByPhotoId(id);
            return ResponseEntity.ok(thumbnail);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{photoId}/tags/{tagId}")
    public void addTagToPhoto(@PathVariable Long photoId, @PathVariable Long tagId) {
        photoTagService.addTagToPhoto(photoId, tagId);
    }


    private byte[] generateThumbnail(MultipartFile file) throws IOException {
        try (InputStream inputStream = file.getInputStream()) {
        // Load the original image
        BufferedImage originalImage = ImageIO.read(inputStream);

        // Define the desired thumbnail size
        int thumbnailWidth = 200;
        int thumbnailHeight = 200;

        // Create a thumbnail image with the desired size
        BufferedImage thumbnailImage = new BufferedImage(thumbnailWidth, thumbnailHeight, BufferedImage.TYPE_INT_RGB);

        // Resize the original image to fit the thumbnail size
        Graphics2D graphics2D = thumbnailImage.createGraphics();
        graphics2D.drawImage(originalImage, 0, 0, thumbnailWidth, thumbnailHeight, null);
        graphics2D.dispose();

        // Compress the thumbnail image into a byte array
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(thumbnailImage, "JPEG", outputStream);

        // Get the compressed thumbnail data as a byte array
        byte[] thumbnailData = outputStream.toByteArray();

        // Close the streams
        inputStream.close();
        outputStream.close();

        // Return the thumbnail data
        return thumbnailData;

        }
    }


}
