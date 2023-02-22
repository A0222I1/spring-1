package com.codegym.building.service.impl;

import com.codegym.building.dto.EmployeeViewDTO;
import com.codegym.building.model.account.Account;
import com.codegym.building.model.person.Employee;
import com.codegym.building.service.AccountService;
import com.codegym.building.service.PersonService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security
        .authentication.UsernamePasswordAuthenticationToken;
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
    static final long EXPIRATION_TIME = 864_000_000; // 10 days
    static final String SECRET = "cumeo";
    static final String TOKEN_PREFIX = "themvaochophuctapkhongcokhongsao";
    static final String HEADER_STRING = "Authorization";

    @Autowired
    AccountService accountService;

    @Autowired
    PersonService<Employee> employeeService;

    public String addAuthentication(HttpServletResponse res, String username) {
        String id = accountService.findIdEmployeeByAccount(username);
        return Jwts.builder()
                .setSubject(String.format("%s - %s", username, id))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

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
