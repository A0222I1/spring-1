package com.codegym.building.error;

public class NotFoundById extends Exception{
    public NotFoundById(String error){
        super(error);
    }
}
