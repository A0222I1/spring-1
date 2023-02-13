package com.codegym.building.service;

import com.codegym.building.dto.resultsDTO;

public interface StatisticsService {
    resultsDTO findAll(String startDate, String finishDate, String checkHighLow, Integer rows, Integer page, Integer pageSize);
}
