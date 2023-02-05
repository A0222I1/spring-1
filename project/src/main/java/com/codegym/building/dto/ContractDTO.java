package com.codegym.building.dto;

import com.codegym.building.model.person.Customer;
import com.codegym.building.model.person.Employee;
import com.codegym.building.model.plane.Plane;
import com.codegym.building.model.typeClass.Term;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.criteria.CriteriaBuilder;
import java.beans.Transient;
import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ContractDTO {
    private Integer id;
    private Integer termId;
    private Double price;
    private Double total;
    private String information;
    private Date start_date;
    private String customerId;
    private String employeeId;
    private Integer planeId;

    @Transient
    public boolean isNew() {return id == null;}

}
