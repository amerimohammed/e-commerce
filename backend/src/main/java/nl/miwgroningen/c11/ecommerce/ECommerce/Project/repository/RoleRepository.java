package nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository;

import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(String roleName);
}
