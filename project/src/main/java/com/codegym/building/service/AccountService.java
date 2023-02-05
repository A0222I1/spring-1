package com.codegym.building.service;

import com.codegym.building.dto.AccountDTO;
import com.codegym.building.model.account.Account;

import java.util.List;

public interface AccountService {
    boolean findByUserName(String name);

    Account save(AccountDTO accountDTO);

    List<Account> findAll();
}
