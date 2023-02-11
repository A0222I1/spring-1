package com.codegym.building.dto;

import com.codegym.building.model.contract.Contract;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.criteria.CriteriaBuilder;
import java.sql.Date;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ContractViewDTO {
    private Integer id;
    private Date start_date;
    private String customerName;
    private String employeeName;
    private Integer planeId;
    private String planeStatus;
    private String idCardCustomer;

//    public ContractViewDTO(Contract contract) {
//        this.id = contract.getId();
//        this.start_date = contract.getStart_date();
//        this.customerName = contract.getCustomer().getName();
//        this.employeeName = contract.getEmployee().getName();
//        this.planeId = contract.getPlane().getId();
//        this.planeStatus = contract.getPlane().getPlaneStatus().getName();
//    }

    public ContractViewDTO(Contract contract) {
        this.id = contract.getId();
        this.start_date = contract.getStart_date();
        this.customerName = contract.getCustomer().getName();
        this.employeeName = contract.getEmployee().getName();
        this.planeId = contract.getPlane().getId();
        this.planeStatus = contract.getPlane().getPlaneStatus().getName();
        this.idCardCustomer =contract.getCustomer().getId_card();

    }
}
