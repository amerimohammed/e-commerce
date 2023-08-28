package nl.miwgroningen.c11.ecommerce.ECommerce.Project.model;

import lombok.Data;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.ImageDto;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.util.ArrayList;
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

    private Integer currentQuantity = 10;
    private Integer soldQuantity = 0;

    @Lob
    private String description = "";

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<ProductImage> productImages = new ArrayList<>();

    public void addImage(ProductImage image) {
        productImages.add(image);
    }

    public List<ImageDto> toImagesDto(){
        List<ImageDto> imagesDto = new ArrayList<>();
        for (ProductImage productImage : productImages) {
            imagesDto.add(
                    ImageDto.builder()
                            .imageId(productImage.getImageId())
                            .imageUrl(productImage.getImageUrl())
                            .build()
            );

        }
        return imagesDto;
    }

}
