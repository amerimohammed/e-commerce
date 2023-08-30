package nl.miwgroningen.c11.ecommerce.ECommerce.Project.service;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.CredentialsDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.SignUpDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.UserDto;

public interface UserService {
    UserDto login(CredentialsDto credentialsDto);
    UserDto register(SignUpDto signUpDto);
}
