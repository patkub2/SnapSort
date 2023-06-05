package pl.polsl.snapsort.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.snapsort.models.Album;
import pl.polsl.snapsort.service.AlbumService;
import pl.polsl.snapsort.service.JwtTokenUtil;

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
        album.setUserId(userId);
        return albumService.createAlbum(album);
    }
    @PutMapping("/{id}")
    public Album updateAlbum(@PathVariable long id, @RequestBody Album album) {
        album.setId( id);
        return albumService.updateAlbum(album);
    }

    @DeleteMapping("/{id}")
    public void deleteAlbum(@PathVariable Long id) {
        albumService.deleteAlbum(id);
    }
}

