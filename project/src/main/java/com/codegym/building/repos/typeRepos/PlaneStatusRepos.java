package com.codegym.building.repos.typeRepos;

import com.codegym.building.model.typeClass.PlaneStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaneStatusRepos extends JpaRepository<PlaneStatus, Integer> {
}
