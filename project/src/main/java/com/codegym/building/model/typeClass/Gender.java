package com.codegym.building.model.typeClass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "gender")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Gender {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String name;

    public Gender(Integer id){
        this.id = id;
    }
}