package com.codegym.building.service;

import com.codegym.building.model.contract.Contract;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.util.List;

public interface StatisticsService {
    List<Contract> findAllByDayStart(String start_date, String end_date);

    List<Contract> findAllByHigh(String start_date, String end_date, Integer rowNumber);

    List<Contract> findAllByLow(String start_date, String end_date, Integer rowNumber);

    XSSFWorkbook XuatBaoCaoTongHop(String start_date, String end_date) throws IOException;

    XSSFWorkbook XuatBaoCaoCao(String start_date, String end_date, Integer rowNumber) throws IOException;

    XSSFWorkbook XuatBaoCaoThap(String start_date, String end_date, Integer rowNumber) throws IOException;

}
