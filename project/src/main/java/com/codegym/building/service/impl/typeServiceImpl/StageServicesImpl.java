package com.codegym.building.service.impl.typeServiceImpl;

import com.codegym.building.model.typeClass.Stage;
import com.codegym.building.repos.typeRepos.StageRepos;
import com.codegym.building.service.IStageServices;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Qualifier("stageServices")
public class StageServicesImpl implements IStageServices {
    @Autowired
    private StageRepos stageRepos;
    @Override
    public List<Stage> findAll() {
        return this.stageRepos.findAll();
    }

    @Override
    public Stage saveStage(Stage stage) {
        this.stageRepos.save(stage);
        return stage;
    }


}
