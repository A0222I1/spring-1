package com.codegym.building.config;

import com.codegym.building.filter.JWTAuthenticationFilter;
import com.codegym.building.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.rememberme.InMemoryTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200/")
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    UserService service;

    @Autowired
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        // Get AuthenticationManager bean
        return super.authenticationManagerBean();
    }

    //Sử dụng thuật toán Bcrypt để mã hóa password.
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();

        // Các trang không yêu cầu login
        http.authorizeRequests().antMatchers("/", "/login", "/logout", "/api").permitAll();
        // phân quyền
//        http.cors().and()
//                .authorizeRequests()
//                //These can be reachable for just have admin role.
//                .antMatchers("/**").hasRole("ADMIN")
//                .antMatchers("/plane").hasRole("USER");

        http.authorizeRequests()
                .antMatchers("/", "/login", "/logout", "/api")
//                .hasAuthority("ADMIN")
                .permitAll()
                .and()
                .formLogin()
                .loginProcessingUrl("/j_security_login")
                .loginPage("/login")
                .defaultSuccessUrl("/")
                .failureUrl("/login?error=true")
                .usernameParameter("username")
                .passwordParameter("password")
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/");

        // Cấu hình Remember Me.
//        http.authorizeRequests().and() //
//                .rememberMe().tokenRepository(this.persistentTokenRepository()) //
//                .tokenValiditySeconds(24 * 60 * 60); // 24h
//        http.csrf().disable();
//
//        http.authorizeRequests()
//                .antMatchers("/", "/login", "/logout", "/employee")
//                .permitAll()
//                .and()
//                .authorizeRequests()
//                .anyRequest()
//                .authenticated()
//                .and()
//                .formLogin()//
//                .loginProcessingUrl("/j_security_login")
//                .loginPage("/login")
//                .defaultSuccessUrl("/")
//                .failureUrl("/login?error=true")
//                .usernameParameter("username")
//                .passwordParameter("password")
//                .and()
//                .logout()
//                .logoutUrl("/logout")
//                .logoutSuccessUrl("/")
//                .and()
//                .rememberMe()
//                .tokenRepository(this.persistentTokenRepository())
//                .tokenValiditySeconds(24 * 60 * 60)
//                .and();
//                .addFilterBefore(new JWTLoginFilter("/j_spring_security", authenticationManager()), UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter() {
        return new JWTAuthenticationFilter();
    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        return new InMemoryTokenRepositoryImpl();
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.userDetailsService(service) // Cung cáp userservice cho spring security
                .passwordEncoder(passwordEncoder()); // cung cấp password encoder
    }
}

