package nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.implementation;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.ImageDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Image;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Product;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.ProductImage;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductImageServiceImpl extends ImageServiceImpl {
    private final ImageRepository imageRepository;
    @Override
    public ProductImage save(MultipartFile imageFile) throws IOException {
        Image image = super.save(imageFile);
        if (image != null) {
            ProductImage productImage = new ProductImage();
            productImage.setImageName(image.getImageName());
            return imageRepository.save(productImage);
        } else {
            return null;
        }
    }

    public void updateProductImages(List<ImageDto> imageDtos, Product product) {
        for (ImageDto imageDto : imageDtos) {
            ProductImage productImage = imageRepository.findById(imageDto.getImageId()).get();
            productImage.setProduct(product);
            imageRepository.save(productImage);
        }
    }

    @Override
    public Boolean Delete(Long imageId) {
        imageRepository.deleteById(imageId);
        return true;
    }
}
