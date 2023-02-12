package com.codegym.building.service.impl;

import com.codegym.building.dto.PlaneDTO;
import com.codegym.building.model.plane.Plane;
import com.codegym.building.repos.PlaneRepos;
import com.codegym.building.service.PlaneServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaneServicesImpl implements PlaneServices {
    @Autowired
    private PlaneRepos planeRepos;
    @Override
    public Page<Plane> findAll(Pageable pageable) {
        return this.planeRepos.findAll(pageable);
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

    @Override
    public List<PlaneDTO> getAllAvailablePlane() {
        return planeRepos.getALlAvailablePlane().stream().map(PlaneDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<PlaneDTO> getAllRentedPlane() {
        return planeRepos.getAllRentedPlane().stream().map(PlaneDTO::new).collect(Collectors.toList());
    }
}
