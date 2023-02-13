package com.codegym.building.utils.validate;


import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;


@Documented
@Constraint(validatedBy = AgeBigger18.class)
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
public @interface CheckAgeBigger18 {
    String message() default "tuổi phải lớn hơn tuổi 18!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}

