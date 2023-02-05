package com.codegym.building.service.impl.typeServiceImpl;

import com.codegym.building.model.typeClass.PlaneType;
import com.codegym.building.repos.typeRepos.PlaneStatusRepos;
import com.codegym.building.repos.typeRepos.PlaneTypeRepos;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Qualifier("planeTypeServices")
public class PlaneTypeServicesImpl implements TypeService<PlaneType> {
    @Autowired
    private PlaneTypeRepos planeTypeRepos;
    @Override
    public List<PlaneType> findAll() {
        return this.planeTypeRepos.findAll();
    }

    @Override
    public void save(PlaneType planeType) {
        this.planeTypeRepos.save(planeType);
    }
}
