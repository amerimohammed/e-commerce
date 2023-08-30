package nl.miwgroningen.c11.ecommerce.ECommerce.Project.controller;

import lombok.RequiredArgsConstructor;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.ImageDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.ProductDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.Response;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.mapper.ProductMapper;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Product;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.implementation.ProductImageServiceImpl;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.implementation.ProductServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import static java.util.Map.of;
import static java.time.LocalDateTime.now;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

/**
 * @author Mohammed Alameri on 19/08/2023.
 * Rest endpoint to consume the resouce Product
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private final ProductServiceImpl productService;
    private final ProductMapper productMapper;
    private final ProductImageServiceImpl imageService;


    @GetMapping("/list")
    public ResponseEntity<Response> getProducts() {
        List<Product> products = new ArrayList<>(productService.list(12));
        List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : products) {
            productDtos.add(productMapper.toProductDto(product));
        }
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("products", productDtos))
                        .message("Products retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }


    @GetMapping("/get/{productId}")
    public ResponseEntity<Response> getProduct(@PathVariable("productId") Long productId) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("product", productMapper.toProductDto(productService.get(productId))))
                        .message("Product retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<Response> saveProduct(@RequestBody @Valid ProductDto productDto) {
        Product product = productMapper.toProduct(productDto);
        product = productService.save(product);
        List<ImageDto> imageDtos = productDto.getProductImages();
        imageService.updateProductImages(imageDtos, product);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("product", productMapper.toProductDto(product)))
                        .message("Product saved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @PostMapping("/create")
    public ResponseEntity<Response> createProduct(@RequestBody @Valid Product product) {
        Product savedProduct = productService.create(product);
        URI productURI = URI.create("/product/get/" + savedProduct.getProductId());
        return ResponseEntity.created(productURI).body(
                Response.builder()
                        .timeStamp(now())
                        .data(of("product", savedProduct))
                        .message("Product created")
                        .status(CREATED)
                        .statusCode(CREATED.value())
                        .build()
        );
    }

    @PatchMapping("/update")
    public ResponseEntity<Response> updateProduct(@RequestBody @Valid Product product) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("product", productService.update(product)))
                        .message("Product updated")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<Response> deleteProduct(@PathVariable("productId") Long productId) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("deleted", productService.delete(productId)))
                        .message("Product deleted")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

}
