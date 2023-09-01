package nl.miwgroningen.c11.ecommerce.ECommerce.Project.mapper;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.ImageDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.SlideImageDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Image;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.SlideImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    ImageDto toImageDto(Image image);


    SlideImageDto toSlideImageDto(SlideImage slideImage);
}
