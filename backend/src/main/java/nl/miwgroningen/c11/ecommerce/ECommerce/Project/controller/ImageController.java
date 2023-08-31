package nl.miwgroningen.c11.ecommerce.ECommerce.Project.controller;

import lombok.RequiredArgsConstructor;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.ImageDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.Response;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.mapper.ImageMapper;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.ProductImage;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.implementation.ProductImageServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/image")
public class ImageController {
    private final ImageMapper imageMapper;
    private final ProductImageServiceImpl imageService;

    @PreAuthorize("hasAnyRole('ROLE_EDITOR', 'ROLE_ADMIN')")
    @PostMapping("/save")
    public ResponseEntity<Response> saveImage(@RequestParam("imageFile")MultipartFile imageFile) throws IOException {
        if(!imageFile.isEmpty()){
            ProductImage productImage = imageService.save(imageFile);
            ImageDto imageDto = imageMapper.toImageDto(productImage);

            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(now())
                            .data(of("image", imageDto))
                            .message("Image saved")
                            .status(OK)
                            .statusCode(OK.value())
                            .build()
            );

        }else{
            throw new IllegalArgumentException("Invalid image");
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_EDITOR', 'ROLE_ADMIN')")
    @DeleteMapping("/delete/{imageId}")
    public ResponseEntity<Response> deleteImage(@PathVariable("imageId") Long imageId) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("deleted", imageService.Delete(imageId)))
                        .message("Image deleted")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
