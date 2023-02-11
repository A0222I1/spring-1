package com.codegym.building.service.impl.typeServiceImpl;

import com.codegym.building.model.typeClass.PlaneStatus;
import com.codegym.building.repos.typeRepos.PlaneStatusRepos;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Qualifier("planeStatusServices")
public class PlaneStatusServicesImpl implements TypeService<PlaneStatus> {
    @Autowired
    private PlaneStatusRepos planeStatusRepos;
    @Override
    public List<PlaneStatus> findAll() {
        return planeStatusRepos.findAll();
    }
    @Override
    public PlaneStatus save(PlaneStatus planeStatus) {
        this.planeStatusRepos.save(planeStatus);
        return planeStatus;
    }
}
