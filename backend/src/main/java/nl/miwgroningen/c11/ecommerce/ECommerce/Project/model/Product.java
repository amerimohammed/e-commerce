package nl.miwgroningen.c11.ecommerce.ECommerce.Project.model;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.util.List;

/**
 * @author Mohammed Alameri on 19/08/2023.
 * Entity representing product object data in the database
 */
@Entity
@Data
public class Product {
    @Id
    @GeneratedValue
    private Long productId;

    @Column(nullable = false, length = 150)
    @Length(min = 5, max = 150)
    private String title;

    @Column(nullable = false, length = 20, unique = true)
    private String code;

    @Column(nullable = false)
    private Double price;

    private Integer currentQuantity;
    private Integer soldQuantity;

    @Lob
    private String description;

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER)
    private List<ProductImage> productImages;

    public void addImage(ProductImage image){
        productImages.add(image);
    }

}
