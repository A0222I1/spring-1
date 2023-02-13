package com.codegym.building.service.impl;

import com.codegym.building.dao.StatisticsDao;
import com.codegym.building.dto.resultsDTO;
import com.codegym.building.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StatisticsImpl implements StatisticsService {

    @Autowired
    public StatisticsDao dao;


    @Override
    public resultsDTO findAll(String startDate, String finishDate, String checkHighLow, Integer rows, Integer page,  Integer pageSize ){
        try {
            resultsDTO dtos = new resultsDTO();

            int pageTotal = dao.countDatas(startDate, finishDate).intValue();
            List<Object[]> getData = dao.getData(startDate, finishDate, checkHighLow, rows, page, pageSize);
            dtos.setPageSize(pageSize);
            dtos.setPage(page);
            dtos.setPageTotal(pageTotal);
            dtos.setListData(getData);
            return dtos;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }


    }
}
