package com.codegym.building.model.typeClass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "stage")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Stage {
    @Id
    Integer id;

    String name;

    public Stage(Integer id) {
        this.id = id;
    }

    public Stage(String name) {
        this.name = name;
    }
}
