package com.codegym.building.service.impl;

import com.codegym.building.dto.AccountDTO;
import com.codegym.building.model.account.Account;
import com.codegym.building.repos.AccountRepos;
import com.codegym.building.repos.IUserRepos;
import com.codegym.building.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    IUserRepos repos;


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
}
