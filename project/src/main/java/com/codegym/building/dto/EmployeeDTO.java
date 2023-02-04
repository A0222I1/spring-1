package com.codegym.building.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmployeeDTO {
    @NotBlank
    @Length(max = 255, message = "độ dài không quá 255 kí tự")
    String avatar;

    @NotBlank
    String name;

    @NotBlank
    String birthday;

    @NotBlank
    String gender;

    @Min(value = 1, message = "lương phải lớn hơn 1")
    Double salary;

    @NotBlank
    String id_card;

    @NotBlank
    String address;

    @NotBlank
    String phone;

    @NotBlank
    String email;

    @NotBlank
    String salaryScale;

    @NotBlank
    String department;

    @NotBlank
    String account;

    @NotBlank
    String password;
}
