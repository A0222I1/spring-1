package com.codegym.building.dto;

import com.codegym.building.model.plane.Plane;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.criteria.CriteriaBuilder;
@Getter
@Setter
public class PlanDTO {
    public Integer id;

    public PlanDTO(Plane plane) {
        this.id = plane.getId();
    }
}
