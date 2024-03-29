package com.codegym.building.controller;

import com.codegym.building.dto.ContractDTO;
import com.codegym.building.dto.ContractViewDTO;
import com.codegym.building.model.contract.Contract;


import com.codegym.building.service.impl.ContractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/contract")
@CrossOrigin("http://localhost:4200/")
public class ContractControlApi {
    @Autowired
    ContractServiceImpl contractService;

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
        return new ResponseEntity<>(contractService.findAll(customerName, employeeName, planeId, dateStart, pageable).map(ContractViewDTO::new), HttpStatus.OK);
    }
    @GetMapping("/contractViewDTO")
    public ResponseEntity<List<ContractViewDTO>> getAll(){
        return  new ResponseEntity<>(contractService.listDtoView(),HttpStatus.OK);
    }

    @GetMapping("/getByCustomerId/{id}")
    public ResponseEntity<List<ContractViewDTO>> getByCustomerId(@PathVariable String id) {
        return new ResponseEntity<>(contractService.findAllByCustomerId(id),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractDTO> findById(@PathVariable Integer id) {
        return  new ResponseEntity<>(contractService.getById(id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        return new ResponseEntity<>(contractService.updateStatusById(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<ContractDTO> addContract(@Valid @RequestBody ContractDTO contractDTO) {
        return new ResponseEntity<>(contractService.save(contractDTO),HttpStatus.OK);
    }
    @PutMapping ("")
    public ResponseEntity<ContractDTO> editContract(@Valid @RequestBody ContractDTO contractDTO) {
        return new ResponseEntity<>(contractService.save(contractDTO),HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
 }
