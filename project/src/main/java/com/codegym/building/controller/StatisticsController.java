package com.codegym.building.controller;

import com.codegym.building.dto.resultsDTO;
import com.codegym.building.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/statistics")
@CrossOrigin(origins = "http://localhost:4200/")
public class StatisticsController {

    @Autowired
    private StatisticsService service;

    @GetMapping("/getdata")
    ResponseEntity<resultsDTO> getData(@RequestParam(name = "startDate", required = false) String startDate,
                                       @RequestParam(name = "finishDate", required = false) String finishDate,
                                       @RequestParam(name = "checkHighLow", required = false) String checkHighLow,
                                       @RequestParam(name = "rows", required = false) Integer rows,
                                       @RequestParam(name = "page", defaultValue = "1") Integer page,
                                       @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize){
        return new ResponseEntity<>(service.findAll(startDate, finishDate, checkHighLow, rows, page, pageSize), HttpStatus.OK);
    }

/*
    @GetMapping("/pdf")
    public ResponseEntity<InputStreamResource> generatePDF() throws IOException {
        String[] data = customerRepository.findAllPotentialCustomer();
        ByteArrayInputStream bais = pdfStatisticCustomer.export(data);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition","inline;filename=cart.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(bais));
    }
*/
}
