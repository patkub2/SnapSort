package pl.polsl.snapsort.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.polsl.snapsort.exceptions.AlbumNotFoundException;
import pl.polsl.snapsort.exceptions.DuplicateAlbumNameException;
import pl.polsl.snapsort.exceptions.PhotoNotFoundException;
import pl.polsl.snapsort.models.Album;
import pl.polsl.snapsort.models.Photo;
import pl.polsl.snapsort.models.User;
import pl.polsl.snapsort.service.AlbumPhotoService;
import pl.polsl.snapsort.service.AlbumService;
import pl.polsl.snapsort.service.JwtTokenUtil;
import pl.polsl.snapsort.service.PhotoService;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/albums")
public class AlbumController {
    private final AlbumService albumService;
    private final JwtTokenUtil jwtTokenUtil;

    private final PhotoService photoService;

    private final AlbumPhotoService albumPhotoService;
    @Autowired
    public AlbumController(AlbumService albumService, JwtTokenUtil jwtTokenUtil, PhotoService photoService, AlbumPhotoService albumPhotoService) {
        this.albumService = albumService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.photoService = photoService;
        this.albumPhotoService = albumPhotoService;
    }

    @GetMapping("")
    public List<Album> getAllAlbums() {
        return albumService.getAllAlbums();
    }

    @GetMapping("/{id}")
    public Optional<Album> getAlbumById(@PathVariable long id) {
        return albumService.getAlbumById(id);
    }

    @PostMapping("/create")
    public Album createAlbum(@RequestHeader("Authorization") String token, @RequestBody Album album) {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));

        boolean albumExists = albumService.existsAlbumByNameAndUserId(album.getName(), userId);
        if (albumExists) {
            throw new DuplicateAlbumNameException("Album name already exists for the user.");
        }

        Album parentAlbum = null;
        if (album.getParent() != null) {
            parentAlbum = albumService.getAlbumById(album.getParent().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Parent album not found."));
            if (parentAlbum.getParent() != null) {
                throw new IllegalArgumentException("Albums can only have one level of children.");
            }
        }

        Album newAlbum = Album.builder()
                .name(album.getName())
                .user(User.builder().id(userId).build())
                .parent(parentAlbum)
                .build();

        return albumService.createAlbum(newAlbum);
    }

    @GetMapping("/user")
    public List<Album> getUserAlbums(@RequestHeader("Authorization") String token) {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));
        return albumService.getAlbumsByUserId(userId);
    }

    @GetMapping("/{albumId}/photos")
    public List<Photo> getAlbumPhotos(@PathVariable Long albumId) {
        return albumService.getAlbumPhotos(albumId);
    }

    @PutMapping("/{id}")
    public Album updateAlbum(@PathVariable long id, @RequestBody Album album) {
        album.setId(id);
        return albumService.updateAlbum(album);
    }

    @PostMapping("/{albumId}/photos/{photoId}")
    public void addPhotoToAlbum(@RequestHeader("Authorization") String token, @PathVariable Long albumId, @PathVariable Long photoId) {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));

        // Check if the album belongs to the logged-in user
        boolean albumBelongsToUser = albumService.existsAlbumByIdAndUserId(albumId, userId);
        if (!albumBelongsToUser) {
            throw new AlbumNotFoundException("Album not found or does not belong to the user.");
        }

        // Check if the photo belongs to the logged-in user
        boolean photoBelongsToUser = photoService.existsPhotoByIdAndUserId(photoId, userId);
        if (!photoBelongsToUser) {
            throw new PhotoNotFoundException("Photo not found or does not belong to the user.");
        }

        Album album = albumService.getAlbumById(albumId).orElseThrow(() -> new AlbumNotFoundException("Album not found."));

        // Check if the photo is already in the album
        boolean photoInAlbum = albumPhotoService.existsPhotoInAlbum(photoId, albumId);
        if (photoInAlbum) {
            throw new IllegalArgumentException("Photo is already in the album.");
        }

        Optional<Photo> photoOptional = Optional.ofNullable(photoService.getPhotoById(photoId));

        if (photoOptional.isPresent()) {
            Photo photo = photoOptional.get();
            albumPhotoService.addPhotoToAlbum(album, photo);
        } else {
            throw new PhotoNotFoundException("Photo not found.");
        }
    }

    @Transactional
    @DeleteMapping("/{id}")
    public void deleteAlbum(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));

        // Check if the album belongs to the logged-in user
        boolean albumBelongsToUser = albumService.existsAlbumByIdAndUserId(id, userId);
        if (!albumBelongsToUser) {
            throw new AlbumNotFoundException("Album not found or does not belong to the user.");
        }

        albumService.deleteAlbum(id);
    }

    @PutMapping("/{id}/rename")
    public Album renameAlbum(@RequestHeader("Authorization") String token,@PathVariable Long id, @RequestBody Album album) {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));

        // Check if the album name is in use already
        boolean albumExists = albumService.existsAlbumByNameAndUserId(album.getName(), userId);
        if (albumExists) {
            throw new DuplicateAlbumNameException("Album name already exists for the user.");
        }
        // Check if the album exists
        Album existingAlbum = albumService.getAlbumById(id).orElseThrow(() -> new AlbumNotFoundException("Album not found."));

        // Update the album name
        existingAlbum.setName(album.getName());

        // Save the updated album
        return albumService.updateAlbum(existingAlbum);
    }

}

