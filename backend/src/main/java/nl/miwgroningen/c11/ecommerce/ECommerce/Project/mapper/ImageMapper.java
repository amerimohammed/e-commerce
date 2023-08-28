package nl.miwgroningen.c11.ecommerce.ECommerce.Project.mapper;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.ImageDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Image;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    ImageDto toImageDto(Image image);
}
