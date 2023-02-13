package com.codegym.building.model.account;
import com.codegym.building.detail.AccountDetail;
import com.codegym.building.dto.AccountDTO;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;
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
    String user_name;

    String password;

    String status;

    @Column(name = "datecreate")
    @CreatedDate
    Date dateCreate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "account")
    List<AccountRole> accountRoles;

    public Account(AccountDTO accountDTO) {
        this.user_name = accountDTO.getUsername();
        this.password = accountDTO.getPassword();
    }

    public Account(String account, String password) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        this.user_name = account;
        this.password = bCryptPasswordEncoder.encode(password);
        this.dateCreate = Date.valueOf(LocalDate.now());
        this.status = "on";
    }

    public Account(String user_name, String password, List<GrantedAuthority> grantList) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        this.user_name = user_name;
        this.password = bCryptPasswordEncoder.encode(password);
    }
}
