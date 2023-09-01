package nl.miwgroningen.c11.ecommerce.ECommerce.Project.controller;

import lombok.RequiredArgsConstructor;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.Response;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.SlideImageDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.mapper.ImageMapper;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.SlideImage;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.implementation.SlideImageServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/slide")
public class SlideController {
    private final ImageMapper imageMapper;
    private final SlideImageServiceImpl slideImageService;

    @PreAuthorize("hasAnyRole('ROLE_EDITOR', 'ROLE_ADMIN')")
    @PostMapping("/save")
    public ResponseEntity<Response> saveSlide(@RequestParam("imageFile") MultipartFile imageFile,
                                              @RequestParam("productId") Long productId) throws IOException {
        if (!imageFile.isEmpty()) {
            SlideImage slideImage = slideImageService.save(imageFile, productId);
            SlideImageDto slideImageDto = imageMapper.toSlideImageDto(slideImage);

            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(now())
                            .data(of("slide", slideImageDto))
                            .message("slide image saved")
                            .status(OK)
                            .statusCode(OK.value())
                            .build()
            );

        } else {
            throw new IllegalArgumentException("Invalid image");
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_EDITOR', 'ROLE_ADMIN')")
    @DeleteMapping("/delete/{imageId}")
    public ResponseEntity<Response> deleteSlide(@PathVariable("imageId") Long imageId) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("deleted", slideImageService.Delete(imageId)))
                        .message("Slide image deleted")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @GetMapping("/list")
    public ResponseEntity<Response> list() {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("slides", slideImageService.list()))
                        .message("Slides retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
