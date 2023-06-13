package pl.polsl.snapsort.controller;

import org.springframework.web.bind.annotation.*;
import pl.polsl.snapsort.exceptions.DuplicateTagException;
import pl.polsl.snapsort.exceptions.TagNotFoundException;
import pl.polsl.snapsort.exceptions.UnauthorizedTagAccessException;
import pl.polsl.snapsort.models.Tag;
import pl.polsl.snapsort.models.User;
import pl.polsl.snapsort.service.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping ("/tags")
public class TagController {

    private final UserService userService;
    private final TagService tagService;
    private final PhotoTagService photoTagService; // Add PhotoTagService dependency

    private final JwtTokenUtil jwtTokenUtil;


    public TagController(UserService userService, TagService tagService, PhotoTagService photoTagService, JwtTokenUtil jwtTokenUtil) {
        this.userService = userService;
        this.tagService = tagService;
        this.photoTagService = photoTagService;
        this.jwtTokenUtil = jwtTokenUtil;
    }
    @PostMapping ("/create")
    public Tag createTag(@RequestHeader ("Authorization") String token, @RequestBody Tag tag) {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));


        boolean tagExists = tagService.existsTagByNameAndUserId(tag.getName(), userId);
        if (tagExists) {
            throw new DuplicateTagException("Tag with the same name already exists for the user.");
        }

        User user = userService.getUserById(userId);
        tag.setUser(user);

        return tagService.createTag(tag);
    }

    @GetMapping("/all")
    public List<Tag> getAllTagsByUser(@RequestHeader("Authorization") String token) {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));
        return tagService.getAllTagsByUserId(userId);
    }


    @DeleteMapping("/{tagId}")
    public void deleteTagById(@RequestHeader("Authorization") String token, @PathVariable Long tagId) throws UnauthorizedTagAccessException {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));

        Tag tag = tagService.getTagById(tagId);

        if (tag == null) {
            throw new TagNotFoundException("Tag not found.");
        }

        if (!tag.getUser().getId().equals(userId)) {
            throw new UnauthorizedTagAccessException("You are not authorized to delete this tag.");
        }

        tagService.deleteTagById(tagId);
    }
}
