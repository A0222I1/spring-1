package com.codegym.building.filter;
import com.codegym.building.service.impl.TokenAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.GenericFilterBean;
import javax.servlet.*;
import java.io.IOException;

public class JWTAuthenticationFilter extends GenericFilterBean {
    @Autowired
    TokenAuthenticationService tokenAuthenticationService;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
