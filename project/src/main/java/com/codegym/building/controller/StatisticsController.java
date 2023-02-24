package com.codegym.building.controller;

import com.codegym.building.dto.ResultsDTO;
import com.codegym.building.service.StatisticsService;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/statistics")
@CrossOrigin(origins = "http://localhost:4200/")
public class StatisticsController {

    @Autowired
    private StatisticsService service;

    @GetMapping("/getdata")
    ResponseEntity<List<ResultsDTO>> getData(@RequestParam(name = "startDate", required = false) String startDate,
                                             @RequestParam(name = "finishDate", required = false) String finishDate) {
        return new ResponseEntity<>(service.findAllByDayStart(startDate, finishDate), HttpStatus.OK);
    }

    @GetMapping("/getdata/high")
    ResponseEntity<List<ResultsDTO>> findAllByHigh(@RequestParam(name = "startDate", required = false) String startDate,
                                                   @RequestParam(name = "finishDate", required = false) String finishDate,
                                                   @RequestParam(name = "rowNumber", required = false, defaultValue = "10") Integer rowNumber) {
        return new ResponseEntity<>(service.findAllByHigh(startDate, finishDate, rowNumber), HttpStatus.OK);
    }

    @GetMapping("/getdata/low")
    ResponseEntity<List<ResultsDTO>> findAllByLow(@RequestParam(name = "startDate", required = false) String startDate,
                                                  @RequestParam(name = "finishDate", required = false) String finishDate,
                                                  @RequestParam(name = "rowNumber", required = false, defaultValue = "10") Integer rowNumber) {
        return new ResponseEntity<>(service.findAllByLow(startDate, finishDate, rowNumber), HttpStatus.OK);
    }

    //print
    @GetMapping("/getdata/print")
    public void printData(HttpServletResponse response, @RequestParam(name = "startDate", required = false) String startDate,
                          @RequestParam(name = "finishDate", required = false) String finishDate) {
        try {
            XSSFWorkbook wb = service.XuatBaoCaoTongHop(startDate, finishDate);
            response.setHeader("Content-Type", "application/excel");
            response.setHeader("Content-Disposition", "attachment; filename=BaoCaoTongHop.xlsx");
            response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
            wb.write(response.getOutputStream());
            response.getOutputStream().flush();
            response.getOutputStream().close();
        } catch (Exception e) {
            e.getStackTrace();
        }
    }

    @GetMapping("/getdata/printhigh")
    public void printAllByHigh(HttpServletResponse response, @RequestParam(name = "startDate", required = false) String startDate,
                               @RequestParam(name = "finishDate", required = false) String finishDate,
                               @RequestParam(name = "rowNumber", required = false, defaultValue = "10") Integer rowNumber) {
        try {
            XSSFWorkbook wb = service.XuatBaoCaoCao(startDate, finishDate, rowNumber);
            response.setHeader("Content-Type", "application/excel");
            response.setHeader("Content-Disposition", "attachment; filename=BaoCaoThuNhapCao.xlsx");
            response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
            wb.write(response.getOutputStream());
            response.getOutputStream().flush();
            response.getOutputStream().close();
        } catch (Exception e) {
            e.getStackTrace();
        }
    }

    @GetMapping("/getdata/printlow")
    public void printAllByLow(HttpServletResponse response, @RequestParam(name = "startDate", required = false) String startDate,
                              @RequestParam(name = "finishDate", required = false) String finishDate,
                              @RequestParam(name = "rowNumber", required = false, defaultValue = "10") Integer rowNumber) {
        try {
            XSSFWorkbook wb = service.XuatBaoCaoThap(startDate, finishDate, rowNumber);
            response.setHeader("Content-Type", "application/excel");
            response.setHeader("Content-Disposition", "attachment; filename=BaoCaoThuNhapThap.xlsx");
            response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
            wb.write(response.getOutputStream());
            response.getOutputStream().flush();
            response.getOutputStream().close();
        } catch (Exception e) {
            e.getStackTrace();
        }
    }
}
