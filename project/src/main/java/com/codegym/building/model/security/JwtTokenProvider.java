package com.codegym.building.model.security;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    private final String JWT_SECRET = "A0222I1";

    //Thời gian có hiệu lực của chuỗi jwt
    private final long JWT_EXPIRATION = 10 * 60 * 60 * 24;

    // Tạo ra jwt từ thông tin user
//    public String generateToken(CustomUserDetails userDetails) {
//        // Tạo chuỗi json web token từ id của user.
//        return Jwts.builder()
//                .setSubject((userDetails.getAccount().getUser_name()))
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
//                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
//                .compact();
//    }

    // Lấy thông tin user từ jwt
    public String getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return (claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
            throw new MalformedJwtException("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }

    public String generateToken(Principal principal) {
        return Jwts.builder()
                .setSubject((principal.getName()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();

    }
}
