package com.codegym.building.model.typeClass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "plane_status")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PlaneStatus {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    String name;

    public PlaneStatus(Integer id) {
        this.id = id;
    }
}
