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

@SqlResultSetMapping(name = "dataStaticResult", classes = {
        @ConstructorResult(targetClass = com.codegym.building.dto.ResultsDTO.class, columns = {
                @ColumnResult(name = "planId", type = Integer.class),
                @ColumnResult(name = "startDate", type = java.util.Date.class),
                @ColumnResult(name = "total", type = Double.class),
                @ColumnResult(name = "information", type = String.class)
        })
})
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


    String information;
    @Column(name = "start_date")
    Date startDate;

    String status;

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



    public Contract(ContractDTO contractDTO) {
        this.id = contractDTO.getId();
        this.term = new Term(contractDTO.getTermId());
        this.price = contractDTO.getPrice();
        this.information = contractDTO.getInformation();
        this.startDate = contractDTO.getStartDate();
        this.customer = new Customer(contractDTO.getCustomerId());
        this.employee = new Employee(contractDTO.getEmployeeId());
        this.plane = new Plane(contractDTO.getPlaneId());

    }
}
