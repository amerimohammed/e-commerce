package nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
