package com.codegym.building.model.typeClass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "plane_type")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PlaneType {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    String name;

    public PlaneType(Integer id) {
        this.id = id;
    }
}
