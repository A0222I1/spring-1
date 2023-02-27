package com.codegym.building.dto;

import com.codegym.building.model.plane.Plane;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
//@NoArgsConstructor
//@AllArgsConstructor
public class ResultsDTO {
    private Integer id;
    private Integer planId;
    private Double total;
    private String information;
    private Date startDate;

    private Plane plane;

    //convert dto
    public ResultsDTO(Integer planId, Date startDate, Double total, String information) {
        this.planId = planId;
        this.startDate = startDate;
        this.total = total;
        this.information = information;
    }

    public ResultsDTO(Double total, String information, Date startDate, Plane plane) {
        this.total = total;
        this.information = information;
        this.startDate = startDate;
        this.plane = plane;
    }
}
