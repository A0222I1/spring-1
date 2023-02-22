package com.codegym.building.model.contract;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.model.person.Customer;
import com.codegym.building.model.person.Employee;
import com.codegym.building.model.plane.Plane;
import com.codegym.building.model.typeClass.Term;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "contract")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    @JoinColumn(columnDefinition = "term_id",
            nullable = false,
            referencedColumnName = "id")
    Term term;

    Double price;

    Double total;
    String information;

    Date start_date;

    @ManyToOne
    @JoinColumn(
            name = "customer_id",
            nullable = false,
            referencedColumnName = "customer_id")
    Customer customer;

    @ManyToOne
    @JoinColumn(
            name = "employee_id",
            nullable = false,
            referencedColumnName = "employee_id")
    Employee employee;

    @ManyToOne
    @JoinColumn(
            name = "plane_id",
            nullable = false,
            referencedColumnName = "id")
    Plane plane;
    public Contract (ContractDTO contractDTO) {
        this.id = contractDTO.getId();
        this.term = new Term(contractDTO.getTermId());
        this.price = contractDTO.getPrice();
        this.total = contractDTO.getTotal();
        this.information = contractDTO.getInformation();
        this.start_date = contractDTO.getStart_date();
        this.customer = new Customer(contractDTO.getCustomerId());
        this.employee = new Employee(contractDTO.getEmployeeId());
        this.plane = new Plane(contractDTO.getPlaneId());

    }
}
