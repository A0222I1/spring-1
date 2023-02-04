package com.codegym.building.service.impl.typeServiceImpl;

import com.codegym.building.model.typeClass.Gender;
import com.codegym.building.repos.typeRepos.GenderRepos;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import javax.annotation.PostConstruct;
import java.util.List;
@Service

public class GenderServiceImpl implements TypeService<Gender> {
    @Autowired
    GenderRepos repos;

    @PostConstruct
    private void getDataBegin(){
        repos.save(new Gender(1,"Nam"));
        repos.save(new Gender(2,"Nữ"));
        repos.save(new Gender(3,"LGBT"));
        repos.save(new Gender(4,"Khác"));
    }

    @Override
    public List<Gender> findAll() {
        return repos.findAll();
    }

    @Override
    public void save(Gender gender) {
        repos.save(gender);
    }
}
