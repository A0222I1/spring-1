package com.codegym.building.service;

import com.codegym.building.model.typeClass.PlaneStatus;

import java.util.List;

public interface IPlaneStatusServices {
    List<PlaneStatus> findAll();
    public PlaneStatus savePlaneStatus(PlaneStatus planeStatus);
}
