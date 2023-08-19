package nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
