package com.codegym.building.service.impl;

import com.codegym.building.error.NotFoundById;
import com.codegym.building.model.account.Account;
import com.codegym.building.repos.AccountRepos;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class UserService implements UserDetailsService {
    @Autowired
    private AccountRepos repos;

    @SneakyThrows
    @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> account = repos.findById(username);
        List<GrantedAuthority> grantList = new ArrayList<>();
        if (account.isPresent()) {
            return new User(account.get().getUser_name(),account.get().getPassword(),grantList);
        }
        throw new NotFoundById("Không thể tìm ra tài khoản nào với tên người dùng là " + username);
    }
}
