package com.codegym.building.model.plane;

import com.codegym.building.model.contract.Contract;
import com.codegym.building.model.person.Customer;
import com.codegym.building.model.typeClass.PlaneStatus;
import com.codegym.building.model.typeClass.PlaneType;
import com.codegym.building.model.typeClass.Stage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "plane")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Plane {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    Double area;

    Double price;

    Double management_costs;

    @ManyToOne
    @JoinColumn(name = "plane_status_id", nullable = false, referencedColumnName = "id")
    PlaneStatus planeStatus;

    @ManyToOne
    @JoinColumn(name = "plane_type_id", nullable = false, referencedColumnName = "id")
    PlaneType planeType;

    @ManyToOne
    @JoinColumn(name = "stage_id",nullable = false, referencedColumnName = "id")
    Stage stage;
    @ManyToOne
    @JoinColumn(name = "customer_id",nullable = false, referencedColumnName = "customer_id")
    Customer customer;

//    @OneToMany(mappedBy = "plane", cascade = CascadeType.ALL)
//    @Transient
//    List<Contract> list;

    public Plane(Integer planeId) {
        this.id = planeId;
    }
}
