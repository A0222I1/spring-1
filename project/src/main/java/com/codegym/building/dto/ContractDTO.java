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
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.beans.Transient;
import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ContractDTO {
    private Integer id;
    @NotBlank
    private Integer termId;
    @NotBlank
    @Min(value = 1,message = "Giá tiền phải nguyên dương")
    private Double price;
    @NotBlank
    @Min(value = 1, message = "Tổng tiền phải nguyên dương")
    private Double total;
    @NotBlank
    private String information;
    @NotBlank
    private Date start_date;
    @NotBlank
    @Pattern(regexp = "^([0-9]{12})$", message = "Chứng minh nhân dân đúng định dạng")
    private String customerId;
    @NotBlank
    private String employeeId;
    @NotBlank
    private Integer planeId;

    @Transient
    public boolean isNew() {return id == null;}

}
