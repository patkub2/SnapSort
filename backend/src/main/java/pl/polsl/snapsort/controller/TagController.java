package pl.polsl.snapsort.controller;

import org.springframework.web.bind.annotation.*;
import pl.polsl.snapsort.models.Tag;
import pl.polsl.snapsort.models.User;
import pl.polsl.snapsort.service.*;

@RestController
@RequestMapping ("/tags")
public class TagController {

    private final UserService userService;
    private final TagService tagService;

    private final JwtTokenUtil jwtTokenUtil;


    public TagController(UserService userService, TagService tagService, JwtTokenUtil jwtTokenUtil) {
        this.userService = userService;
        this.tagService = tagService;
        this.jwtTokenUtil = jwtTokenUtil;
    }
    @PostMapping ("/create")
    public Tag createTag(@RequestHeader ("Authorization") String token, @RequestBody Tag tag) {
        Long userId = jwtTokenUtil.extractUserId(token.replace("Bearer ", ""));

        User user = userService.getUserById(userId);
        tag.setUser(user);

        return tagService.createTag(tag);
    }
}
