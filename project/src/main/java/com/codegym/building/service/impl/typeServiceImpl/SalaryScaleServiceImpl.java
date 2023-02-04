package com.codegym.building.service.impl.typeServiceImpl;

import com.codegym.building.model.typeClass.SalaryScale;
import com.codegym.building.repos.typeRepos.SalaryScaleRepos;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
@Service

public class SalaryScaleServiceImpl implements TypeService<SalaryScale> {
    @Autowired
    SalaryScaleRepos repos;

    @PostConstruct
    private void getDataBegin() {
        repos.save(new SalaryScale(1, "Bậc 1"));
        repos.save(new SalaryScale(2, "Bậc 2"));
        repos.save(new SalaryScale(3, "Bậc 3"));
        repos.save(new SalaryScale(4, "Bậc 4"));
    }

    @Override
    public List<SalaryScale> findAll() {
        return repos.findAll();
    }

    @Override
    public void save(SalaryScale salaryScale) {
        repos.save(salaryScale);
    }
}
