package com.codegym.building.dto;

import com.codegym.building.model.contract.Contract;
import com.codegym.building.model.person.Customer;
import com.codegym.building.model.person.Employee;
import com.codegym.building.model.plane.Plane;
import com.codegym.building.model.typeClass.Term;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResultsDTO {
    private Integer id;
    private Term term;
    private Double price;
    private Double total;
    private String information;
    private Date startDate;
    private Customer customer;
    private Employee employee;
    private Plane plane;
}
