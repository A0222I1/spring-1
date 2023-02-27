package com.codegym.building.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
    @NotBlank(message = " nhập thông tin vào nhá")
    private String information;
    @NotNull(message = "nhập ngày bắt đầu nữa nhé")

    private Date startDate;
    @NotBlank(message = "nhập sai mã nhân viên rồi")
    private String customerId;
    @NotBlank
    private String employeeId;
    @NotNull(message = "chưa có plane kìa")
    private Integer planeId;

    @Transient
    public boolean isNew() {return id == null;}

}
