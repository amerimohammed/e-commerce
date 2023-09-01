package nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.implementation;

import lombok.RequiredArgsConstructor;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.SlideImageDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.mapper.ImageMapper;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Image;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Product;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.ProductImage;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.SlideImage;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository.SlideImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SlideImageServiceImpl extends ImageServiceImpl {
    private final SlideImageRepository slideImageRepository;
    private final ImageMapper imageMapper;

    @Override
    public SlideImage save(MultipartFile imageFile, Long productId) throws IOException {
        Image image = super.save(imageFile);
        if (image != null) {
            Product product = new Product();
            product.setProductId(productId);
            SlideImage slideImage = new SlideImage();
            slideImage.setImageName(image.getImageName());
            slideImage.setProduct(product);
            return slideImageRepository.save(slideImage);
        } else {
            return null;
        }
    }

    @Override
    public Boolean Delete(Long imageId) {
        slideImageRepository.deleteById(imageId);
        return true;
    }

    public List<SlideImageDto> list() {
        return slideImageRepository.findAll().stream().map(imageMapper::toSlideImageDto).collect(Collectors.toList());
    }
}
