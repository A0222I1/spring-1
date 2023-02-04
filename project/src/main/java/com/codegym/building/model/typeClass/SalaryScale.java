package com.codegym.building.model.typeClass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "salary_scale")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class SalaryScale {
    @Id
    Integer id;

    String name;

    public SalaryScale(Integer id) {
        this.id = id;
    }

    public SalaryScale(String name) {
        this.name = name;
    }
}
