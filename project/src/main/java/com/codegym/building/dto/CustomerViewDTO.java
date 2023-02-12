package com.codegym.building.dto;

import com.codegym.building.model.person.Customer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Date;
@Getter
@Setter
public class CustomerViewDTO {
    public String id;
    public String name;
    public String address;
    public String email;
    public String id_card;
    public String phone;
    public Date birthday;
    public String website;

    public CustomerViewDTO(Customer customer) {
        this.id = customer.getId();
        this.name = customer.getName();
        this.address = customer.getAddress();
        this.email = customer.getEmail();
        this.id_card = customer.getId_card();
        this.phone = customer.getPhone();
        this.birthday = customer.getBirthday();
        this.website = customer.getWebsite();
    }
}
