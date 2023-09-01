package nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.SlideImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlideImageRepository extends JpaRepository<SlideImage, Long> {
}
