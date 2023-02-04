package com.codegym.building.model.typeClass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "term")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Term {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    String name;

    public Term(Integer id) {
        this.id = id;
    }
}
