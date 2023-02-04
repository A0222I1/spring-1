package com.codegym.building.dto;

import com.codegym.building.model.person.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.text.SimpleDateFormat;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmployeeViewDTO {
    String id;
    String avatar;
    String name;
    Date birthday;
    String gender;
    Double salary;
    String id_card;
    String address;
    String phone;
    String email;
    String salaryScale;
    String department;
    String account;
    String dateBegin;

    public EmployeeViewDTO(Employee employee){
        this.id = employee.getId();
        this.avatar = employee.getAvatar();
        this.name = employee.getName();
        this.birthday = employee.getBirthday();
        this.gender = employee.getGender().getName();
        this.salary = employee.getSalary();
        this.id_card = employee.getId_card();
        this.address = employee.getAddress();
        this.phone = employee.getPhone();
        this.email = employee.getEmail();
        this.salaryScale = employee.getSalaryScale().getName();
        this.department = employee.getDepartment().getName();
        this.account = employee.getAccount() == null ? "chưa có tài khoản":employee.getAccount().getUser_name();
        this.dateBegin = employee.getAccount() == null ? "chưa có tài khoản" :new SimpleDateFormat("dd/MM/yyyy").format(employee.getAccount().getDateCreate()) ;
    }
}
