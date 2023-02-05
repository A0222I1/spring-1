package com.codegym.building.model.account;

import com.codegym.building.dto.AccountDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "account_role", uniqueConstraints = { //
        @UniqueConstraint(name = "USER_ROLE_UK", columnNames = {"user_name", "role_id"})})
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AccountRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_name", nullable = false, referencedColumnName = "user_name")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false, referencedColumnName = "id")
    private Roles roles;

    public AccountRole (AccountDTO accountDTO){
        this.account = new Account(accountDTO.getUsername(),accountDTO.getPassword());
        this.roles = new Roles(3L);
    }
}
