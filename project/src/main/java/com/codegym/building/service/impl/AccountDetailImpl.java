package com.codegym.building.service.impl;

import com.codegym.building.model.account.Account;
import com.codegym.building.repos.AccountRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountDetailImpl implements UserDetailsService {
    @Autowired
    AccountRepos accountRepos;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account customerName = accountRepos.findByUsername(username);

        if (customerName == null) {
            System.out.println("Customer not found! " + username);
            throw new UsernameNotFoundException("Username " + username + " was not found in the database");
        }

        System.out.println("Found Customer: " + customerName);
        List<GrantedAuthority> grantList = new ArrayList<>();
        grantList.add(new SimpleGrantedAuthority("Roles_Admin"));
        return  new User(customerName.getUser_name(),
                customerName.getPassword(), grantList);
    }
}
