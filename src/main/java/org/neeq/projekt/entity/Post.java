package org.neeq.projekt.entity;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "posts")
public class Post {
    @Id
    private String id;
    @Size(max = 50)
    @NotBlank(message = "Title cannot be empty")
    private String title;
    @Size(max = 500)
    @NotBlank(message = "Body cannot be empty")
    private String body;
    @Size(max = 50)
    @NotBlank(message = "Author cannot be empty")
    private String author;
    private LocalDate createdAt = LocalDate.now();
    @Size(max = 5000)
    private Binary image;


    public Post(String title, String body, String author, Binary image) {
        this.title = title;
        this.body = body;
        this.author = author;
        this.image = image;
    }
}
