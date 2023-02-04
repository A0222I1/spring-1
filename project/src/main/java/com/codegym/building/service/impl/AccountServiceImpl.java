package com.codegym.building.service.impl;

import com.codegym.building.dto.AccountDTO;
import com.codegym.building.model.account.Account;
import com.codegym.building.repos.AccountRepos;
import com.codegym.building.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    AccountRepos repos;


    @Override
    public boolean findByUserName(String name) {
        return repos.findById(name).isPresent();
    }

    @Override
    public Account save(AccountDTO accountDTO) {
        return repos.save(new Account(accountDTO));
    }
}
