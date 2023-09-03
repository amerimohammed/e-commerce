package nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto;

import lombok.Data;

@Data
public class CheckoutItem {
    private Long productId;
    private Long quantity;
}
