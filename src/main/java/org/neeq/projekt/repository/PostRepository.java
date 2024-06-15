package org.neeq.projekt.repository;

import org.neeq.projekt.entity.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    Optional<Post> findByTitle(String title);

    Optional<Post> findById(String id);

    Iterable<Post> findByAuthor(String author);
}
