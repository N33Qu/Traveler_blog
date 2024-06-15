package org.neeq.projekt.controller;


import lombok.AllArgsConstructor;
import org.neeq.projekt.exceptions.PostCreationException;
import org.neeq.projekt.exceptions.PostEditException;
import org.neeq.projekt.entity.Post;
import org.neeq.projekt.dto.PostRequest;
import org.neeq.projekt.service.PostService;
import org.neeq.projekt.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/posts")
@AllArgsConstructor
public class PostController {
    private final PostService postService;
    private final UserService userService;
    @PostMapping(value = "createPost", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<Post> createPost(
            @RequestParam("title") String title,
            @RequestParam("body") String body,
            @RequestParam(value = "image", required = false) MultipartFile image) throws PostCreationException {
        PostRequest request = new PostRequest(title, body, image);
        return ResponseEntity.ok(postService.createPost(request));
    }
    @GetMapping("getAllPosts")
    public ResponseEntity<Iterable<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("getUserPosts")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('USER'))")
    public ResponseEntity<Iterable<Post>> getUserPosts(Principal connectedUser) {
        return ResponseEntity.ok(postService.getPostsByUser(connectedUser));
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('USER'))")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        postService.deletePostById(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping(value = "{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @PreAuthorize("hasRole('ADMIN') or (hasRole('USER'))")
    public ResponseEntity<Post> editPost(
            @PathVariable String id,
            @RequestParam("title") String title,
            @RequestParam("body") String body,
            @RequestParam(value = "image", required = false) MultipartFile image) throws PostEditException {
        PostRequest request = new PostRequest(title, body, image);
        return ResponseEntity.ok(postService.editPostById(id, request));
    }


}
