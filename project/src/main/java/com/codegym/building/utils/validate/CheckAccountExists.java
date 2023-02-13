package com.codegym.building.utils.validate;

import com.codegym.building.model.person.Employee;
import com.codegym.building.service.AccountService;
import com.codegym.building.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CheckAccountExists  implements ConstraintValidator<ExistsAccount, String> {
    @Autowired
    AccountService service;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !service.findByUserName(value);
    }
}
