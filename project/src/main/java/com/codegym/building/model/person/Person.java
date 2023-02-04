package com.codegym.building.model.person;

import com.codegym.building.model.account.Account;
import com.codegym.building.model.typeClass.Gender;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Getter
@Setter
@Builder
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
public class Person {
    String name;

    Date birthday;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "gender_id",
            referencedColumnName = "id"
    )
    Gender gender;

    String address;

    @Column(
            name = "id_card"
     )
    String id_card;

    String phone;

    String email;
//
//    @CreatedDate
//    @Column(name = "day_begin")
//    Timestamp dayBegin;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "account_name",
            referencedColumnName = "user_name")
    Account account;

    String avatar;

    String status;
}
