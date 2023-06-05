package pl.polsl.snapsort.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.polsl.snapsort.exceptions.DuplicateAlbumNameException;
import pl.polsl.snapsort.models.Album;
import pl.polsl.snapsort.models.User;
import pl.polsl.snapsort.service.AlbumService;
import pl.polsl.snapsort.service.JwtTokenUtil;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/albums")
public class AlbumController {
    private final AlbumService albumService;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public AlbumController(AlbumService albumService, JwtTokenUtil jwtTokenUtil) {
        this.albumService = albumService;
        this.jwtTokenUtil = jwtTokenUtil;
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

    @PutMapping("/{id}")
    public Album updateAlbum(@PathVariable long id, @RequestBody Album album) {
        album.setId(id);
        return albumService.updateAlbum(album);
    }

    @DeleteMapping("/{id}")
    public void deleteAlbum(@PathVariable Long id) {
        albumService.deleteAlbum(id);
    }
}

