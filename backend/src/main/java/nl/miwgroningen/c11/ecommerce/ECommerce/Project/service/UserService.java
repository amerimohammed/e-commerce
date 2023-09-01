package nl.miwgroningen.c11.ecommerce.ECommerce.Project.service;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.CredentialsDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.SignUpDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.UserDto;

import java.util.Collection;
import java.util.List;

public interface UserService {
    UserDto login(CredentialsDto credentialsDto);
    UserDto register(SignUpDto signUpDto);

    UserDto update(UserDto userDto);

    Collection<UserDto> list();

    Boolean delete(Long userId);
}
