package nl.miwgroningen.c11.ecommerce.ECommerce.Project.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
@Data
public class SlideImage extends Image {
    @OneToOne
    Product product;

    public Long getProductId(){
        return product.getProductId();
    }
}
