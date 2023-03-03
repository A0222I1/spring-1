package com.codegym.building.detail;

import com.codegym.building.model.account.Account;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class UsernameDetail {
    public static String toString(Account account) {
        StringBuilder sb = new StringBuilder();

        sb.append("UserName:").append(account.getUsername());

        Collection<GrantedAuthority> authorities = null;
        if (authorities != null && !authorities.isEmpty()) {
            sb.append(" (");
            boolean first = true;
            for (GrantedAuthority a : authorities) {
                if (first) {
                    sb.append(a.getAuthority());
                    first = false;
                } else {
                    sb.append(", ").append(a.getAuthority());
                }
            }
            sb.append(")");
        }
        return sb.toString();
    }
}
