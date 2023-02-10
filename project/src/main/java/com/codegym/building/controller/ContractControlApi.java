package com.codegym.building.controller;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.dto.ContractViewDTO;
import com.codegym.building.model.contract.Contract;
import com.codegym.building.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contract")
@CrossOrigin("http://localhost:4200/")
public class ContractControlApi {
    @Autowired
    ContractService contractService;

    @GetMapping("")
    public ResponseEntity<List<ContractViewDTO>> getAll() {
        return new ResponseEntity<>(contractService.list(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractDTO> findById(@PathVariable Integer id) {
        return  new ResponseEntity<>(contractService.getById(id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        return new ResponseEntity<>(contractService.delete(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<ContractDTO> addContract(@RequestBody ContractDTO contractDTO) {
        return new ResponseEntity<>(contractService.save(contractDTO),HttpStatus.OK);
    }
    @PutMapping ("")
    public ResponseEntity<ContractDTO> editContract(@RequestBody ContractDTO contractDTO) {
        return new ResponseEntity<>(contractService.save(contractDTO),HttpStatus.OK);
    }
 }
