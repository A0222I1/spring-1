package com.codegym.building.controller;

import com.codegym.building.model.typeClass.*;
import com.codegym.building.service.IPlaneStatusServices;
import com.codegym.building.service.IPlaneTypeServices;
import com.codegym.building.service.IStageServices;
import com.codegym.building.service.TypeService;
import com.codegym.building.service.impl.typeServiceImpl.DepartmentServiceImpl;
import com.codegym.building.service.impl.typeServiceImpl.GenderServiceImpl;
import com.codegym.building.service.impl.typeServiceImpl.SalaryScaleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("type")
@CrossOrigin("http://localhost:4200/")
public class TypeControllerApi {
    @Autowired
    GenderServiceImpl genderService;

    @Autowired
    DepartmentServiceImpl departmentService;

    @Autowired
    SalaryScaleServiceImpl salaryScaleService;

    @Autowired
    @Qualifier("planeStatusServices")
    IPlaneStatusServices planeStatusServices;


    @Autowired
    @Qualifier("planeTypeServices")
    IPlaneTypeServices planeTypeServices;


    @Autowired
    @Qualifier("stageServices")

    IStageServices stageServices;


    @GetMapping("planeStatus")
    public ResponseEntity<List<PlaneStatus>> findAllPlaneStatus(){
        return new ResponseEntity<>(planeStatusServices.findAll(),HttpStatus.OK);
    }
    @GetMapping("planeType")
    public ResponseEntity<List<PlaneType>> findAllPlaneType(){
        return new ResponseEntity<>(planeTypeServices.findAll(),HttpStatus.OK);
    }

    @GetMapping("stage")
    public ResponseEntity<List<Stage>> findAllPlane(){
        return new ResponseEntity<>(stageServices.findAll(),HttpStatus.OK);
    }
    @GetMapping("gender")
    public ResponseEntity<List<Gender>> findAllGender() {
        return new ResponseEntity<>(genderService.findAll(), HttpStatus.OK);
    }

    @GetMapping("department")
    public ResponseEntity<List<Department>> findAllDepartment() {
        return new ResponseEntity<>(departmentService.findAll(), HttpStatus.OK);
    }

    @GetMapping("salary")
    public ResponseEntity<List<SalaryScale>> findAllSalaryScale() {
        return new ResponseEntity<>(salaryScaleService.findAll(), HttpStatus.OK);
    }

}
