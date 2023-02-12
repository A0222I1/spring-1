package com.codegym.building.repos;

import com.codegym.building.model.plane.Plane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlaneRepos extends JpaRepository<Plane, Integer> {
    @Query(value = "select p from Plane  p where p.planeStatus = '2'")
    List<Plane> getALlAvailablePlane();

    @Query(value = "select  p from  Plane  p where  p.planeStatus = '3'")
    List<Plane> getAllRentedPlane();
}
