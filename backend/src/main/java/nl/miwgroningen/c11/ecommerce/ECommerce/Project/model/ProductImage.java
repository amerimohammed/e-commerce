package nl.miwgroningen.c11.ecommerce.ECommerce.Project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * @author Mohammed Alameri on 19/08/2023.
 * Entity to store products images data.
 */
@Entity
@Data
public class ProductImage extends Image {
    @ManyToOne
    private Product product;
}
