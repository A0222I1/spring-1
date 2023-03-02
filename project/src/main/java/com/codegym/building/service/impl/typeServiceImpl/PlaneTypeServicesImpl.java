package com.codegym.building.service.impl.typeServiceImpl;

import com.codegym.building.model.typeClass.PlaneType;
import com.codegym.building.repos.typeRepos.PlaneTypeRepos;
import com.codegym.building.service.IPlaneTypeServices;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Qualifier("planeTypeServices")
public class PlaneTypeServicesImpl implements IPlaneTypeServices {
    @Autowired
    private PlaneTypeRepos planeTypeRepos;
    @Override
    public List<PlaneType> findAll() {
        return this.planeTypeRepos.findAll();
    }

    @Override
    public PlaneType savePlanType(PlaneType planeType) {
        this.planeTypeRepos.save(planeType);
        return planeType;
    }
}
