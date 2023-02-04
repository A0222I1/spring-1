package com.codegym.building.model.news;

import com.codegym.building.model.person.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "news")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String title;

    String content;

    String avatar;


    @ManyToOne
    @JoinColumn(name = "employee_id",
            nullable = false,
            referencedColumnName = "employee_id")
    Employee employee;
}
