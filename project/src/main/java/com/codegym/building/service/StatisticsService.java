package com.codegym.building.service;

import com.codegym.building.dto.resultsDTO;

import java.text.ParseException;
import java.util.List;

public interface StatisticsService {
    resultsDTO findAll(String startDate, String finishDate, Boolean checkHighLow, Integer rows, Integer page, Integer pageSize );
}
