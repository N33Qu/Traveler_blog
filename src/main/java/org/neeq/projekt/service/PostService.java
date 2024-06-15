package org.neeq.projekt.service;

import lombok.AllArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.neeq.projekt.exceptions.PostCreationException;
import org.neeq.projekt.exceptions.PostEditException;
import org.neeq.projekt.exceptions.PostNotFoundException;
import org.neeq.projekt.entity.Post;
import org.neeq.projekt.repository.PostRepository;
import org.neeq.projekt.dto.PostRequest;
import org.neeq.projekt.entity.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.security.Principal;

/**
 * Service class for handling business logic related to posts.
 */
@AllArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;

    public Post createPost(@RequestBody PostRequest request) throws PostCreationException {
        try {
            User user = userService.getCurrentUserProfile();
            Post newPost = new Post(request.getTitle(), request.getBody(), user.getUsername1(), new Binary(BsonBinarySubType.BINARY, request.getImage().getBytes()));
            postRepository.save(newPost);
            return newPost;
        } catch (IOException e) {
            throw new PostCreationException("Failed to create post", e);
        }
    }

    public Iterable<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(String id) {
        return postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("Post not found with id: " + id));
    }

    public void deletePostById(String id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("Post not found with id: " + id));
        postRepository.deleteById(id);
    }

    public Post editPostById(String id, @RequestBody PostRequest request) throws PostEditException {
        try {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new PostNotFoundException("Post not found with id: " + id));
            post.setTitle(request.getTitle());
            post.setBody(request.getBody());
            if (request.getImage() != null) {
                post.setImage(new Binary(BsonBinarySubType.BINARY, request.getImage().getBytes()));
            }
            return postRepository.save(post);
        } catch (IOException e) {
            throw new PostEditException("Error editing post with id: " + id, e);
        }
    }


    public Iterable<Post> getPostsByUser(Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        return postRepository.findByAuthor(user.getUsername1());
    }
}
