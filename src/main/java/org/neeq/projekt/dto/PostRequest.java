package org.neeq.projekt.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class PostRequest {
    @Size(max = 50)
    private String title;
    @NotBlank(message = "Body cannot be empty")
    @Size(max = 500)
    private String body;
    private MultipartFile image;
}
