package com.codegym.building.repos.typeRepos;

import com.codegym.building.model.typeClass.SalaryScale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalaryScaleRepos extends JpaRepository<SalaryScale,Integer> {
}
