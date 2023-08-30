package nl.miwgroningen.c11.ecommerce.ECommerce.Project.configuration;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.Response;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.exceptions.AppException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;


@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(value = {AppException.class})
    @ResponseBody
    public ResponseEntity<Response> handleException(AppException ex) {
        return ResponseEntity.status(ex.getHttpStatus())
                .body(
                        Response.builder()
                                .timeStamp(now())
                                .data(of("error", "error occurred"))
                                .message(ex.getMessage())
                                .status(ex.getHttpStatus())
                                .statusCode(ex.getHttpStatus().value())
                                .build()
                );
    }
}
