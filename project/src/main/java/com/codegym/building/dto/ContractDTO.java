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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.beans.Transient;
import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ContractDTO {
    private Integer id;
    @NotNull(message = "Quên nhâp term kìa")
    private Integer termId;
    @NotNull(message = "Nhập tiền vào")
    @Min(value = 1,message = "Giá tiền phải nguyên dương")
    private Double price;
    @NotNull(message = "Nhập tiền thuê vào")
    @Min(value = 1, message = "Tổng tiền phải nguyên dương")
    private Double total;
    @NotBlank(message = " nhập thông tin vào nhá")
    private String information;
    @NotNull(message = "nhập ngày bắt đầu nữa nhé")
    private Date start_date;
    @NotBlank(message = "nhập sai mã nhân viên rồi")
    private String customerId;
    @NotBlank
    private String employeeId;
    @NotNull(message = "chưa có plane kìa")
    private Integer planeId;

    @Transient
    public boolean isNew() {return id == null;}

}
