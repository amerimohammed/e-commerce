package nl.miwgroningen.c11.ecommerce.ECommerce.Project.service;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    Image save(MultipartFile imageFile) throws IOException;

    Boolean Delete(Long imageId);

    List<Image> saveList(List<Image> images);

    Image save(MultipartFile imageFile, Long productId) throws IOException;
}
