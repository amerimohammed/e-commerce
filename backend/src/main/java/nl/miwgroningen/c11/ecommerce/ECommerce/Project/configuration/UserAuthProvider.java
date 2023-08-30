package nl.miwgroningen.c11.ecommerce.ECommerce.Project.configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.UserDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.exceptions.AppException;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.mapper.UserMapper;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.User;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.*;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Value("${app.jwt.secret:defaultValueKey}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(UserDto userDto) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 60 * 60 * 1000);// one hour
        return JWT.create()
                .withIssuer("MITW-ecommernce")
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withSubject(userDto.getUsername())
                .withClaim("firstName", userDto.getFirstName())
                .withClaim("lastName", userDto.getLastName())
                .withClaim("roles", userDto.getRoles())
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);

        UserDto userDto = UserDto.builder()
                .username(decodedJWT.getSubject())
                .firstName(decodedJWT.getClaim("firstName").asString())
                .lastName(decodedJWT.getClaim("lastName").asString())
                .roles(decodedJWT.getClaim("roles").asList(String.class))
                .build();
        return new UsernamePasswordAuthenticationToken(userDto, null, getAuthorities(userDto.getRoles()));
    }

    public Authentication validateTokenStrongly(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);

        User user = userRepository.findByUsername(decodedJWT.getSubject()).orElseThrow(
                ()-> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return new UsernamePasswordAuthenticationToken(
                userMapper.toUserDto(user), null, getAuthorities(user.getRolesList()));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(List<String> roles) {
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

        for (String role : roles) {
            authorityList.add(new SimpleGrantedAuthority(role));
        }

        System.out.println(authorityList);

        return authorityList;
    }
}
