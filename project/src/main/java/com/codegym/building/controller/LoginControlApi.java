package com.codegym.building.controller;

import com.codegym.building.dto.AccountDTO;
import com.codegym.building.model.security.JwtTokenProvider;
import com.codegym.building.service.impl.AccountRoleImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/login")
@CrossOrigin("http://localhost:4200/")
public class LoginControlApi {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    AccountRoleImpl accountRole;

    @GetMapping("")
    public ResponseEntity<?> authenticateUser(@RequestBody AccountDTO accountDTO) {
        List<GrantedAuthority> roles = accountRole.findListRoles(accountDTO.getUsername());
        User user = new User(accountDTO.getUsername(),accountDTO.getPassword(),roles);
        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                       user.getUsername(),user.getPassword(), null
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken((Principal) authentication.getPrincipal());
        return new ResponseEntity<>(jwt, HttpStatus.OK);
    }

    @GetMapping("/check")
    public ResponseEntity<String> randomStuff() {
        return new ResponseEntity<>("JWT Hợp lệ mới có thể thấy được message này", HttpStatus.OK);
    }

}
