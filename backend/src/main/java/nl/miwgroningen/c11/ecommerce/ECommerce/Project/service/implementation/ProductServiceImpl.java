package nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.implementation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Product;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository.ProductRepository;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.ProductService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;

import static org.springframework.data.domain.PageRequest.of;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepo;

    @Override
    public Product create(Product product) {
        log.info("Saving new Product : {}", product.getCode());
        return productRepo.save(product);
    }

    @Override
    public Product get(Long productId) {
        log.info("Fetching product by id: {}", productId);
        return productRepo.findById(productId).get();
    }

    @Override
    public Collection<Product> list(int limit) {
        log.info("Fetching Products...");
        return productRepo.findAll(of(0, limit)).toList();
    }

    @Override
    public Product update(Product product) {
        log.info("Updating product: {}", product.getCode());
        return productRepo.save(product);
    }

    @Override
    public Boolean delete(Long productId) {
        log.info("Deleting Product by id: {}", productId);
        productRepo.deleteById(productId);
        return true;
    }

    @Override
    public Product save(Product product) {
        log.info("Saving product: {}", product.getCode());
        return productRepo.save(product);
    }
}
