package com.codegym.building.service.impl;

import com.codegym.building.dto.AccountDTO;
import com.codegym.building.error.ControllerError;
import com.codegym.building.model.account.Account;
import com.codegym.building.repos.AccountRepos;
import com.codegym.building.repos.IUserRepos;
import com.codegym.building.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    IUserRepos repos;

    @Autowired
     AccountRepos accountRepos;


    @Override
    public String findIdEmployeeByAccount(String username) {
        return String.valueOf(repos.findById(username));
    }

    @Override
    public boolean findByUserName(String name) {
        return repos.findById(name).isPresent();
    }

    @Override
    public Account save(AccountDTO accountDTO) {
        return repos.save(new Account(accountDTO));
    }

    @Override
    public List<Account> findAll() {
        return repos.findAll();
    }

    @Override
    public boolean checkValidUser(AccountDTO accountDTO) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        Account account = accountRepos.findByUsername(accountDTO.getUsername());
        if(account != null){
          return bCryptPasswordEncoder.matches(accountDTO.getPassword(), account.getPassword());
        }
        throw new UsernameNotFoundException("User not valid.");
    }
}
