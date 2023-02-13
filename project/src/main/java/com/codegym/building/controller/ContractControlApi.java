package com.codegym.building.controller;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.dto.ContractViewDTO;
import com.codegym.building.model.contract.Contract;
import com.codegym.building.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public ResponseEntity<Page<Contract>> getAll(@PageableDefault(value = 2) Pageable pageable)     {
        Page<Contract> contracts = contractService.list(pageable);
        if (contracts.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(contracts,HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<ContractViewDTO>> getAllCustom(@RequestParam(name = "customerName", defaultValue = "") String customerName,
                                                              @RequestParam(name = "employeeName", defaultValue = "") String employeeName,
                                                              @RequestParam(name = "planeId" ,defaultValue = "") String planeId,
                                                              @RequestParam(name = "dateStart", defaultValue = "") String dateStart,
                                                              @PageableDefault(size = 5) Pageable pageable) {
        return new ResponseEntity<>(contractService.findAll(customerName, employeeName, planeId, dateStart, pageable).map(item -> new ContractViewDTO((Contract) item)), HttpStatus.OK);
    }
    @GetMapping("/contractViewDTO")
    public ResponseEntity<List<ContractViewDTO>> getAll(){
        return  new ResponseEntity<List<ContractViewDTO>>(contractService.listDtoView(),HttpStatus.OK);
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
