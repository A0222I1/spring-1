package com.codegym.building.controller;

import com.codegym.building.dto.AccountDTO;
import com.codegym.building.model.account.Account;
import com.codegym.building.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("account")
@CrossOrigin("http://localhost:4200/")
public class AccountControlApi {
    @Autowired
    AccountService accountService;

    @GetMapping("/{username}")
    public ResponseEntity<Boolean> checkExists(@PathVariable String username) {
        return new ResponseEntity<>(accountService.findByUserName(username), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Account> saveAccount(@RequestBody  AccountDTO accountDTO){
        return new ResponseEntity<>(accountService.save(accountDTO),HttpStatus.OK);
    }
}
