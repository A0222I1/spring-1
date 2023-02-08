package com.codegym.building.dto;

import com.codegym.building.model.contract.Contract;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.criteria.CriteriaBuilder;
import java.sql.Date;
@Getter
@Setter
public class ContractViewDTO {
    private Integer id;
    private String termName;
    private Double price;
    private Double total;
    private String information;
    private Date start_date;
    private String customerName;
    private String employeeName;
    private Integer planeId;

    public ContractViewDTO(Contract contract) {
        this.id = contract.getId();
        this.termName = contract.getTerm().getName();
        this.price = contract.getPrice();
        this.total = contract.getTotal();
        this.information = contract.getInformation();
        this.start_date = contract.getStart_date();
        this.customerName = contract.getCustomer().getName();
        this.employeeName = contract.getEmployee().getName();
        this.planeId = contract.getPlane().getId();
    }
}
