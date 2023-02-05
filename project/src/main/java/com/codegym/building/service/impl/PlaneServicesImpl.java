package com.codegym.building.service.impl;

import com.codegym.building.model.plane.Plane;
import com.codegym.building.repos.PlaneRepos;
import com.codegym.building.service.PlaneServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaneServicesImpl implements PlaneServices {
    @Autowired
    private PlaneRepos planeRepos;
    @Override
    public List<Plane> findAll() {
        return this.planeRepos.findAll();
    }

    @Override
    public void savePlane(Plane plane) {
            this.planeRepos.save(plane);
    }

    @Override
    public void deletePlane(Plane plane) {
            this.planeRepos.delete(plane);
    }

    @Override
    public Plane findPlaneById(int id) {
        return this.planeRepos.findById(id).orElse(null);
    }
}
