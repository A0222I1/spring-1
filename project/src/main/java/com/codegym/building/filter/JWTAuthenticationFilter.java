package com.codegym.building.filter;

import com.codegym.building.model.security.JwtTokenProvider;
import com.codegym.building.service.impl.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JWTAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenProvider tokenProvider;

    private UserService service;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        try {
//            // Lấy jwt từ request
//            String jwt = getJwtFromRequest(request);
//            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
//                String userData = tokenProvider.getUserIdFromJWT(jwt);
//                UserDetails userDetails = service.loadUserByUsername(userData);
//                if (userDetails != null) {
//                     UsernamePasswordAuthenticationToken
//                            authentication = new UsernamePasswordAuthenticationToken(userDetails, null, null);
//                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authentication);
//                }
//            }
//        } catch (Exception ex) {
//            System.out.println(ex.getMessage());
//        }
        filterChain.doFilter(request, response);
    }

//    private String getJwtFromRequest(HttpServletRequest request) {
//        String bearerToken = request.getHeader("Authorization");
//        // Kiểm tra xem header Authorization có chứa thông tin jwt không
//        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("A0222I1")) {
//            return bearerToken.substring(7);
//        }
//        return null;
//    }
}
