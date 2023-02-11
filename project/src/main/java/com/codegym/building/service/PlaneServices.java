package com.codegym.building.service;

import com.codegym.building.dto.PlanDTO;
import com.codegym.building.model.plane.Plane;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PlaneServices {
    Page<Plane> findAll(Pageable pageable);
    void savePlane(Plane plane);
    void deletePlane(Plane plane);
    Plane findPlaneById(int id);
    List<PlanDTO> getAllPlane();
}
