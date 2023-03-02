package com.codegym.building.service.impl.typeServiceImpl;

import com.codegym.building.model.typeClass.PlaneStatus;
import com.codegym.building.repos.typeRepos.PlaneStatusRepos;
import com.codegym.building.service.IPlaneStatusServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Qualifier("planeStatusServices")
public class PlaneStatusServicesImpl implements IPlaneStatusServices {
    @Autowired
    private PlaneStatusRepos planeStatusRepos;
    @Override
    public List<PlaneStatus> findAll() {
        return planeStatusRepos.findAll();
    }

    @Override
    public PlaneStatus savePlaneStatus(PlaneStatus planeStatus) {
        this.planeStatusRepos.save(planeStatus);
        return planeStatus;
    }
}
