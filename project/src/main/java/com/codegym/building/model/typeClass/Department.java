package com.codegym.building.model.typeClass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "department")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Department {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String name;

    public Department(Integer id) {
        this.id = id;
    }
}