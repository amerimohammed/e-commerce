package nl.miwgroningen.c11.ecommerce.ECommerce.Project.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;

@Component
public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

        // this is to allow response accepting date in the JSON response
        OBJECT_MAPPER.registerModule(new JavaTimeModule());

        OBJECT_MAPPER.writeValue(response.getOutputStream(),
                Response.builder()
                        .timeStamp(now())
                        .data(of("error", "error occurred"))
                        .message(authException.getMessage())
                        .status(HttpStatus.UNAUTHORIZED)
                        .statusCode(HttpStatus.UNAUTHORIZED.value())
                        .build());
    }
}
