package com.codegym.building.dto;

import com.codegym.building.model.plane.Plane;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.criteria.CriteriaBuilder;
@Getter
@Setter
public class PlaneDTO {
    public Integer id;

    public PlaneDTO(Plane plane) {
        this.id = plane.getId();
    }
}
