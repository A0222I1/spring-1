package com.codegym.building.utils.validate;

import java.util.List;

public class ErrorResponse {
    private String errorMessage;
    private String errors;

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrors() {
        return errors;
    }

    public void setErrors(String errors) {
        this.errors = errors;
    }

    public ErrorResponse(String errorMessage, String errors) {
        this.errorMessage = errorMessage;
        this.errors = errors;
    }
}
