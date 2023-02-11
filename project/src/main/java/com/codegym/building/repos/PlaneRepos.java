package com.codegym.building.repos;

import com.codegym.building.model.plane.Plane;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaneRepos extends JpaRepository<Plane,Integer> {
}
