package com.codegym.building.dto;

import com.codegym.building.model.account.AccountRole;
import com.codegym.building.model.account.Roles;
import com.codegym.building.model.contract.Contract;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.Comparator;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ContractViewDTO {
    private Integer id;
    private Date startDate;
    private String customerName;
    private String employeeName;
    private Integer planeId;
    private String planeStatus;
    private String idCardCustomer;
    private Long maxRole;
    private String accountName;

    public ContractViewDTO(Contract contract) {
        this.id = contract.getId();
        this.startDate = contract.getStartDate();
        this.customerName = contract.getCustomer().getName();
        this.employeeName = contract.getEmployee().getName();
        this.planeId = contract.getPlane().getId();
        this.planeStatus = contract.getPlane().getPlaneStatus().getName();
        this.idCardCustomer = contract.getCustomer().getId_card();
        this.maxRole = getMaxRole(contract.getEmployee().getAccount().getAccountRoles()) ;
        this.accountName = contract.getEmployee().getAccount().getUsername();
    }

    public Long getMaxRole(List<AccountRole> listAccountRole) {
        Roles roles = listAccountRole.stream().map(AccountRole::getRoles).min(Comparator.comparing(Roles::getId)).orElse(null);
        if(roles == null) {
            return Long.valueOf(0);
        }
        return roles.getId();
    }
}
