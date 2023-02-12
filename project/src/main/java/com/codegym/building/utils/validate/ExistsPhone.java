package com.codegym.building.utils.validate;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.ElementType.TYPE_USE;
@Documented
@Constraint(validatedBy = CheckPhoneExists.class)
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
public @interface ExistsPhone {
         String message() default "điện thoại đã tồn tại!";

        Class<?>[] groups() default {};

        Class<? extends Payload>[] payload() default {};


}
