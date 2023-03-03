package com.codegym.building.model.account;
import com.codegym.building.detail.AccountDetail;
import com.codegym.building.dto.AccountDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "account")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Account extends AccountDetail {
    @Id
    @Column(name = "user_name")
    String username;
    String password;
    String status;

    @Column(name = "datecreate")
    @CreatedDate
    Date dateCreate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "account")
    @JsonIgnore
    List<AccountRole> accountRoles;

    public Account(AccountDTO accountDTO) {
        this.username = accountDTO.getUsername();
        this.password = accountDTO.getPassword();
    }

    public Account(String user_name) {
        this.username = user_name;
    }

    public Account(String user_name, String password) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        this.username = user_name;
        this.password = bCryptPasswordEncoder.encode(password);
    }
}
