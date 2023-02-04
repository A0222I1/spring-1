package com.codegym.building.controller;

import com.codegym.building.model.typeClass.Department;
import com.codegym.building.model.typeClass.Gender;
import com.codegym.building.model.typeClass.SalaryScale;
import com.codegym.building.service.impl.typeServiceImpl.DepartmentServiceImpl;
import com.codegym.building.service.impl.typeServiceImpl.GenderServiceImpl;
import com.codegym.building.service.impl.typeServiceImpl.SalaryScaleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
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
