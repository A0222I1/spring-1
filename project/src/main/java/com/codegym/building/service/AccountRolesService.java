package com.codegym.building.service;

import org.springframework.security.core.GrantedAuthority;

import java.util.List;

public interface AccountRolesService {
    List<GrantedAuthority> findListRoles(String username);

    void updateDefaultRolesOffAccountRegister(String username);
}
