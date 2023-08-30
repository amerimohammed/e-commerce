package nl.miwgroningen.c11.ecommerce.ECommerce.Project.controller;

import lombok.RequiredArgsConstructor;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.configuration.UserAuthProvider;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.CredentialsDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.Response;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.SignUpDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.UserDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.implementation.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserServiceImpl userService;
    private final UserAuthProvider userAuthProvider;


    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthProvider.createToken(userDto));
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("user", userDto))
                        .message("user logged in")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody SignUpDto signUpDto) {
        UserDto userDto = userService.register(signUpDto);
        userDto.setToken(userAuthProvider.createToken(userDto));
        return ResponseEntity.created(URI.create("/users/" + userDto.getId())).body(
                Response.builder()
                        .timeStamp(now())
                        .data(of("user", userDto))
                        .message("user created")
                        .status(CREATED)
                        .statusCode(CREATED.value())
                        .build()
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@AuthenticationPrincipal UserDto user){
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }
}
