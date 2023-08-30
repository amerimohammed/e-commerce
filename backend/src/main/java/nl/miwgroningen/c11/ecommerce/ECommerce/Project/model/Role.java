package nl.miwgroningen.c11.ecommerce.ECommerce.Project.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Setter
@Getter
public class Role {
    @GeneratedValue
    @Id
    private Long roleId;

    @Column(unique = true, length = 50, nullable = false)
    private String roleName;

    @Override
    public String toString() {
        return this.roleName;
    }
}
