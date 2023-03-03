package com.codegym.building.service.impl;

import com.codegym.building.dto.EmployeeViewDTO;
import com.codegym.building.model.person.Employee;
import com.codegym.building.service.AccountRolesService;
import com.codegym.building.service.AccountService;
import com.codegym.building.service.PersonService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static java.util.Collections.emptyList;

@Service
public class TokenAuthenticationService {
    static final long EXPIRATION_TIME_REMEMBER_ME = 24 * 60 * 60 * 1000; // 1 days
    static final long EXPIRATION_TIME =  60 * 60 * 1000; // 1 phút
    static final String SECRET = "a0222i1";
    static final String TOKEN_PREFIX = "a0222i1";
    static final String HEADER_STRING = "Authorization";

    @Autowired
    AccountService accountService;

    @Autowired
    AccountRolesService accountRolesServicel;

    public String addAuthentication(String username, Boolean rememberMe) {
        String id = accountService.findIdEmployeeByAccount(username);
//        String role = String.valueOf(accountRolesServicel.findListRoles(username));
        if (rememberMe) {
            return Jwts.builder()
                    .setSubject(String.format("%s - %s", username, id))
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_REMEMBER_ME))
                    .signWith(SignatureAlgorithm.HS512, SECRET)
                    .compact();
        }
        return Jwts.builder()
                .setSubject(String.format("%s - %s", username, id))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    @Autowired
    PersonService<Employee> employeeService;

    // autherwide để lấy id
    public Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            // parse the token.
            String user = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody()
                    .getSubject();

            return user != null ?
                    new UsernamePasswordAuthenticationToken(user, null, emptyList()) :
                    null;
        }
        return null;
    }

    public EmployeeViewDTO parse(String token) {
        String user = Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();
        List<String> userName = Arrays.asList(user.split("-"));
        Employee employee = employeeService.findByUserName(userName.get(0).trim());
        return new EmployeeViewDTO(employee);
    }
}
