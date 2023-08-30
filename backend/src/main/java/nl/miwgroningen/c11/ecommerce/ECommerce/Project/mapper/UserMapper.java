package nl.miwgroningen.c11.ecommerce.ECommerce.Project.mapper;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.SignUpDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.dto.UserDto;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "roles", expression = "java(user.getRolesList())")
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);
}
