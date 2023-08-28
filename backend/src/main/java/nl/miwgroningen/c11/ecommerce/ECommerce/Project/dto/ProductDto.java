package nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.ProductImage;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDto {
    private Long productId;
    private String title;
    private String code;
    private Double price;
    private Integer currentQuantity = 10;
    private Integer soldQuantity = 0;
    private String description = "";
    private List<ImageDto> productImages = new ArrayList<>();
}
