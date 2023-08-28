package nl.miwgroningen.c11.ecommerce.ECommerce.Project.mapper;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.ProductDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "productImages", expression = "java(product.toImagesDto())")
    ProductDto toProductDto(Product product);

    Product toProduct(ProductDto productDto);
}
