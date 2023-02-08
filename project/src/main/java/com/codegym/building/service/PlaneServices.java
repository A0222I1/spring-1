package com.codegym.building.service;

import com.codegym.building.model.plane.Plane;

import java.util.List;

public interface PlaneServices {
    List<Plane> findAll();
    void savePlane(Plane plane);
    void deletePlane(Plane plane);
    Plane findPlaneById(int id);
}
