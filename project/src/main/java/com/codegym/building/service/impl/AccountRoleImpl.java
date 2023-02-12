package com.codegym.building.service.impl;

import com.codegym.building.model.account.AccountRole;
import com.codegym.building.model.account.Roles;
import com.codegym.building.repos.AccountRoleRepos;
import com.codegym.building.service.AccountRolesService;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountRoleImpl implements TypeService<AccountRole>, AccountRolesService {
    @Autowired
    AccountRoleRepos repos;

    @Override
    public List<AccountRole> findAll() {
        return repos.findAll();
    }

    @Override
    public AccountRole save(AccountRole accountRole) {
        return repos.save(accountRole);
    }

    @Override
    public List<GrantedAuthority> findListRoles(String username) {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        List<Roles> roles = new ArrayList<>();
        repos.findAllByAccountName(username).forEach(x -> roles.add(x.getRoles()));
        roles.forEach(x -> grantedAuthorities.add(new SimpleGrantedAuthority("ROLES_"+x.getName())));
        return grantedAuthorities;
    }
//
//    @Override
//    public List<Roles> findListRoles(String username) {
//        return null;
//    }

    @Override
    public void updateDefaultRolesOffAccountRegister(String user_name) {
        repos.updateRolesByUserName(user_name);
    }

}
