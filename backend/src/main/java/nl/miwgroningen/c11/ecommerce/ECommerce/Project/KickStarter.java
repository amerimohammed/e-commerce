package nl.miwgroningen.c11.ecommerce.ECommerce.Project;

import lombok.RequiredArgsConstructor;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.Role;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.model.User;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository.RoleRepository;
import nl.miwgroningen.c11.ecommerce.ECommerce.Project.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@RequiredArgsConstructor
public class KickStarter implements CommandLineRunner {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUsername("admin").isEmpty()) {
            Role adminRole = new Role();
            adminRole.setRoleName("ROLE_ADMIN");
            roleRepository.save(adminRole);

            Role editorRole = new Role();
            editorRole.setRoleName("ROLE_EDITOR");
            roleRepository.save(editorRole);

            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setFirstName("Mark");
            admin.setLastName("Vries");

            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(adminRole);
            admin.setRoles(adminRoles);

            userRepository.save(admin);

            User editor = new User();
            editor.setUsername("editor");
            editor.setPassword(passwordEncoder.encode("editor"));
            editor.setFirstName("Max");
            editor.setLastName("Dijkma");

            Set<Role> editorRoles = new HashSet<>();
            editorRoles.add(editorRole);
            editor.setRoles(editorRoles);

            userRepository.save(editor);
        }
    }
}
