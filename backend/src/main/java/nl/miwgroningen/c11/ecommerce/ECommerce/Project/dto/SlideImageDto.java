package nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SlideImageDto {
    private Long imageId;
    private String imageUrl;
    private Long productId;
}
