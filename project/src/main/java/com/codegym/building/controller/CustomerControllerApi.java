package com.codegym.building.controller;
import com.codegym.building.error.NotFoundById;
import com.codegym.building.dto.CustomerViewDTO;
import com.codegym.building.model.person.Customer;
import com.codegym.building.model.person.Employee;
import com.codegym.building.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/customer")
@CrossOrigin("http://localhost:4200/")
public class CustomerControllerApi {
    private final int MAX_DISPLAY = 5;

    @Autowired
    PersonService<Customer> customerPersonService;

    @GetMapping("")
    public ResponseEntity<Page<Customer>> findAllByCondition(@RequestParam(name = "name", defaultValue = "") String name,
                                                             @RequestParam(name = "id_card", defaultValue = "") String id_card,
                                                             @RequestParam(name = "address", required = false, defaultValue = "") String address,
                                                             @RequestParam(name = "company", required = false, defaultValue = "") String company,
                                                             @PageableDefault(size = MAX_DISPLAY, sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {
        return new ResponseEntity<>(customerPersonService.findAllByNameAndIdCardAndAddressAndDepartment(name, id_card, address, company, pageable), HttpStatus.OK);
    }

    @GetMapping("/dto")
    public ResponseEntity<List<CustomerViewDTO>> getAllCustomerViewDto() {
        return new ResponseEntity<>(customerPersonService.getAll().stream().map(CustomerViewDTO::new).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Customer> findById(@PathVariable String id) throws NotFoundById {
        return new ResponseEntity<>(customerPersonService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/findByIdCard/{id}")
    private ResponseEntity<CustomerViewDTO> findByIdCardForContract(@PathVariable String id) {
        return new ResponseEntity<>( new CustomerViewDTO(customerPersonService.findIdCardForContract(id)), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Integer> updateStatusById(@PathVariable String id) {
        return new ResponseEntity<>(customerPersonService.updateStatusById(id), HttpStatus.OK);
    }

    @DeleteMapping("")
    private ResponseEntity<Integer> updateStatusAll() {
        return new ResponseEntity<>(customerPersonService.updateStatusAll(), HttpStatus.OK);
    }

    @PostMapping("")
    private ResponseEntity<Customer> createEmployee(@Valid @RequestBody  Customer customer) {
        return new ResponseEntity<>(customerPersonService.save(customer), HttpStatus.OK);
    }

    @PatchMapping("")
    private ResponseEntity<Customer> editEmployee(@RequestBody Customer customer) {
        return new ResponseEntity<>(customerPersonService.save(customer), HttpStatus.OK);
    }

}
