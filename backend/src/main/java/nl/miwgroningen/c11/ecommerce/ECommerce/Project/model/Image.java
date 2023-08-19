package nl.miwgroningen.c11.ecommerce.ECommerce.Project.model;

import lombok.Data;

import javax.persistence.*;

/**
 * @author Mohammed Alameri on 19/08/2023.
 * only abstract for any image in the app
 */
@MappedSuperclass
@Data
public abstract class Image {
    @Id
    @GeneratedValue
    private Long imageId;

    @Column(nullable = false, length = 100)
    private String imageName;

    public String getImageUrl () {
        return "/images/" + imageName;
    }
}
