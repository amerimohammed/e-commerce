package nl.miwgroningen.c11.ecommerce.ECommerce.Project.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.CheckoutItem;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Product;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.ProductService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/stripe")
public class StripeController {
    private final ProductService productService;
    private final String CURRENCY = "EUR";
    private final String SUCCESS_URL = "http://localhost:4200/payment/success";
    private final String CANCEL_URL = "http://localhost:4200/payment/fail";

    @Value("${app.STRIPE_SECRET_KEY}")
    private String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    @PostMapping("/payment")
    public ResponseEntity<Map<String, String>> paymentWithCheckoutPage(
            @RequestBody List<CheckoutItem> items) throws StripeException {
        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();
        for (CheckoutItem item : items) {
            lineItems.add(getLineItem(item));
        }

        SessionCreateParams params = SessionCreateParams.builder()

                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(SUCCESS_URL)
                .setCancelUrl(CANCEL_URL)
                .addAllLineItem(lineItems).build();

        Session session = Session.create(params);
        Map<String, String> responseData = new HashMap<>();

        responseData.put("id", session.getId());
        return ResponseEntity.ok(responseData);
    }

    private SessionCreateParams.LineItem getLineItem(CheckoutItem item) {
        Product product = productService.get(item.getProductId());
        return SessionCreateParams.LineItem.builder()
                .setQuantity(item.getQuantity())
                .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency(CURRENCY)
                        .setUnitAmount((long) (product.getPrice() * 100))
                        .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .setName(product.getTitle()).build()).build()).build();
    }
}
