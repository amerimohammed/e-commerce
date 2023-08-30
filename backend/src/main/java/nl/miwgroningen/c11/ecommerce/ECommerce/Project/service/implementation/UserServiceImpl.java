package nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.implementation;

import lombok.RequiredArgsConstructor;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.CredentialsDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.SignUpDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.UserDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.exceptions.AppException;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.mapper.UserMapper;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.User;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository.UserRepository;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Override
    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByUsername(credentialsDto.getUsername())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    @Override
    public UserDto register(SignUpDto signUpDto) {
        Optional<User> oUser = userRepository.findByUsername(signUpDto.getUsername());
        if(oUser.isPresent()){
            throw new AppException("Username already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(signUpDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDto.getPassword())));
        User savedUser = userRepository.save(user);
        return userMapper.toUserDto(savedUser);
    }
}
