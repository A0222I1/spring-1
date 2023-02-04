package com.codegym.building.service.impl.typeServiceImpl;

import com.codegym.building.model.typeClass.Department;
import com.codegym.building.model.typeClass.Gender;
import com.codegym.building.repos.typeRepos.DepartmentRepos;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
@Service
public class DepartmentServiceImpl implements TypeService<Department> {
    @Autowired
    DepartmentRepos repos;

    @PostConstruct
    private void getDataBegin(){
        repos.save(new Department(1,"Marketing"));
        repos.save(new Department(2,"Bán Hàng"));
        repos.save(new Department(3,"Quản Lý"));
    }

    @Override
    public List<Department> findAll() {
        return repos.findAll();
    }

    @Override
    public void save(Department department) {
        repos.save(department);
    }
}
