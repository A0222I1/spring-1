package com.codegym.building.dto;

import com.codegym.building.model.plane.Plane;
import com.codegym.building.service.impl.CustomerServiceImpl;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlaneViewDTO {

    Integer id;
    Double area;
    Double price;

    Double managementCosts;

    String planeStatus;

    String planeTypeName;

    String stageName;

    String customerName;

    public PlaneViewDTO(Plane plane) {
        this.id = plane.getId();
        this.area = plane.getArea();
        this.price = plane.getPrice();
        this.planeStatus = plane.getPlaneStatus().getName();
        this.planeTypeName = plane.getPlaneType().getName();
        this.stageName = plane.getStage().getName();

    }
}
