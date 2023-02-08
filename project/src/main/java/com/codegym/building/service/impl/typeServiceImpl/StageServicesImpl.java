package com.codegym.building.service.impl.typeServiceImpl;

import com.codegym.building.model.typeClass.Stage;
import com.codegym.building.repos.typeRepos.StageRepos;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Qualifier("stageServices")
public class StageServicesImpl implements TypeService<Stage> {
    @Autowired
    private StageRepos stageRepos;
    @Override
    public List<Stage> findAll() {
        return this.stageRepos.findAll();
    }

    @Override
    public void save(Stage stage) {
        this.stageRepos.save(stage);
    }
}
