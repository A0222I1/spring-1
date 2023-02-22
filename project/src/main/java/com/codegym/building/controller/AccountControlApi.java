package com.codegym.building.controller;

import com.codegym.building.dto.AccountDTO;
import com.codegym.building.dto.EmployeeViewDTO;
import com.codegym.building.dto.TokenAPI;
import com.codegym.building.model.account.Account;
import com.codegym.building.service.impl.AccountDetailImpl;
import com.codegym.building.service.impl.AccountServiceImpl;
import com.codegym.building.service.impl.TokenAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

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

    @PostMapping("/login")
    public ResponseEntity<TokenAPI> checkAllPass(@RequestBody AccountDTO accountDTO, HttpServletResponse res) {
       UserDetails userDetails = accountDetailImpl.loadUserByUsername(accountDTO.getUsername());
       return new ResponseEntity<>(new TokenAPI("token",tokenAuthenticationService.addAuthentication(res,userDetails.getUsername()) ), HttpStatus.OK);
    }

    @GetMapping("/{account}")
    public ResponseEntity<Boolean> checkExists(@PathVariable String account){
        return new ResponseEntity<>(accountService.findByUserName(account),HttpStatus.OK);
    }

//    @GetMapping("")
//    public ResponseEntity<List<Account>> findAll(){
//        return new ResponseEntity<>(accountService.findAll(),HttpStatus.OK);
//    }

    @GetMapping("/checkToken/{token}")
    public ResponseEntity<EmployeeViewDTO> checkToken(@PathVariable String token) {

        return new ResponseEntity<>(tokenAuthenticationService.parse(token), HttpStatus.OK);
    }
}
