package nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ProductImage, Long> {
}
