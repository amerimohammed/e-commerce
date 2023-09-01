package nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.implementation;

import lombok.RequiredArgsConstructor;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.CredentialsDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.SignUpDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.UserDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.exceptions.AppException;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.mapper.UserMapper;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Role;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.User;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository.RoleRepository;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository.UserRepository;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final RoleRepository roleRepository;

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

    @Override
    public UserDto update(UserDto userDto) {
        Optional<User> oUser = userRepository.findById(userDto.getId());
        if(oUser.isPresent()){
            User user = oUser.get();
            User newUser = userMapper.userDtoToUser(userDto);
            for (String role : userDto.getRoles()) {
                newUser.addRole(roleRepository.findByRoleName(role).get());
            }
            newUser.setPassword(user.getPassword());
            return userMapper.toUserDto(userRepository.save(newUser));
        }else{
            throw new AppException("Unknown user", HttpStatus.NOT_FOUND);
        }

    }

    @Override
    public Collection<UserDto> list() {
        return userRepository.findAll().stream().map(userMapper::toUserDto).collect(Collectors.toList());
    }

    @Override
    public Boolean delete(Long userId) {
        userRepository.deleteById(userId);
        return true;
    }
}
