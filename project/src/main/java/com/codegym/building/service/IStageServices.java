package com.codegym.building.service;

import com.codegym.building.model.typeClass.Stage;

import java.util.List;

public interface IStageServices {
    List<Stage> findAll();
    public Stage saveStage(Stage stage);
}

