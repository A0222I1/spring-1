package com.codegym.building.service;

import com.codegym.building.model.typeClass.PlaneType;

import java.util.List;

public interface IPlaneTypeServices {
    List<PlaneType> findAll();
    public PlaneType savePlanType(PlaneType planeType);
}
