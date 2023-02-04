package com.codegym.building.repos.typeRepos;

import com.codegym.building.model.typeClass.Gender;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenderRepos extends JpaRepository<Gender,Integer> {
}
