package com.codegym.building.repos.typeRepos;

import com.codegym.building.model.typeClass.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepos extends JpaRepository<Department,Integer> {
}
