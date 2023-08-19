package nl.miwgroningen.c11.ecommerce.ECommerce.Project.service;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Product;

import java.util.Collection;

public interface ProductService {
    Product create(Product product);

    Product get(Long productId);

    Collection<Product> list(int limit);

    Product update(Product product);

    Boolean delete(Long productId);
}
