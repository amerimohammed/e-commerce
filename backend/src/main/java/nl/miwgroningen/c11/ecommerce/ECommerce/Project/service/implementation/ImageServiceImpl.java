package nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.implementation;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Image;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.ImageService;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class ImageServiceImpl implements ImageService {
    private final String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/uploads";

    @Override
    public Image save(MultipartFile imageFile) throws IOException {
        StringBuilder fileName = new StringBuilder();
        fileName.append(UUID.randomUUID());
        if (getExtensionByStringHandling(imageFile.getOriginalFilename()).isPresent()) {
            fileName.append(".").append(getExtensionByStringHandling(imageFile.getOriginalFilename()).get());
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, fileName.toString());
            Files.write(fileNameAndPath, imageFile.getBytes());
            Image image = new Image();
            image.setImageName(fileName.toString());
            return image;
        } else {
            return null;
        }
    }

    @Override
    public Boolean Delete(Long imageId) {
        return null;
    }

    @Override
    public List<Image> saveList(List<Image> images) {
        return null;
    }

    @Override
    public Image save(MultipartFile imageFile, Long productId) throws IOException {
        return null;
    }

    private Optional<String> getExtensionByStringHandling(String filename) {
        return Optional.ofNullable(filename)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(filename.lastIndexOf(".") + 1));
    }
}
