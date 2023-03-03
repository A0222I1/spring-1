package com.codegym.building.controller;

import com.codegym.building.dto.AccountDTO;
import com.codegym.building.dto.EmployeeViewDTO;
import com.codegym.building.dto.TokenAPI;
import com.codegym.building.model.account.Account;
import com.codegym.building.service.impl.AccountDetailImpl;
import com.codegym.building.service.impl.AccountServiceImpl;
import com.codegym.building.service.impl.TokenAuthenticationService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("account")
@CrossOrigin("http://localhost:4200/")
public class AccountControlApi {
    @Autowired
    private AccountServiceImpl accountService;
    @Autowired
    TokenAuthenticationService tokenAuthenticationService;
    @Autowired
    private AccountDetailImpl accountDetailImpl;

    @SneakyThrows
    @PostMapping("/login")
    public ResponseEntity<TokenAPI> checkAllPass(@RequestBody AccountDTO accountDTO) {
      if(accountService.checkValidUser(accountDTO)) {
          UserDetails userDetails = accountDetailImpl.loadUserByUsername(accountDTO.getUsername());
          return new ResponseEntity<>(new TokenAPI("token", tokenAuthenticationService.addAuthentication(userDetails.getUsername(), (accountDTO.getRememberMe()))), HttpStatus.OK);
      }
      throw new Exception("User not valid.");
    }

    @GetMapping("/{account}")
    public ResponseEntity<Boolean> checkExists(@PathVariable String account) {
        return new ResponseEntity<>(accountService.findByUserName(account), HttpStatus.OK);
    }

    @GetMapping("/checkToken/{token}")
    public ResponseEntity<EmployeeViewDTO> checkToken(@PathVariable String token) {
        return new ResponseEntity<>(tokenAuthenticationService.parse(token), HttpStatus.OK);
    }
}
