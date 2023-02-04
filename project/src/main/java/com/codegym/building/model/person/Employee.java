package com.codegym.building.model.person;

import com.codegym.building.dto.EmployeeDTO;
import com.codegym.building.model.account.Account;
import com.codegym.building.model.typeClass.Department;
import com.codegym.building.model.typeClass.Gender;
import com.codegym.building.model.typeClass.SalaryScale;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "employee")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee extends Person {
    @Getter
    @Id
    @Column(name = "employee_id")
    @GeneratedValue(generator = "person-generator")
    @GenericGenerator(name = "person-generator",
            parameters = @org.hibernate.annotations.Parameter(name = "prefix", value = "NV-"),
            strategy = "com.codegym.building.utils.PersonAutoGenerator")
    String id;

    Double salary;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            columnDefinition = "salary_scale_id",
            referencedColumnName = "id")
    SalaryScale salaryScale;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            columnDefinition = "department_id",
            referencedColumnName = "id"
    )
    Department department;

    public Employee(EmployeeDTO employeeDTO) {
        super(employeeDTO.getName(),
                Date.valueOf(employeeDTO.getBirthday()),
                new Gender(Integer.parseInt(employeeDTO.getGender())),
                        employeeDTO.getAddress(),
                        employeeDTO.getId_card(),
                        employeeDTO.getPhone(),
                        employeeDTO.getEmail(),
                        new Account(employeeDTO.getAccount(),employeeDTO.getPassword()),
                        employeeDTO.getAvatar(),
                       "on");
        this.department = new Department(Integer.parseInt(employeeDTO.getDepartment()));
        this.salaryScale = new SalaryScale(Integer.parseInt(employeeDTO.getSalaryScale()));
        this.salary= employeeDTO.getSalary();
    }
}
