package com.codegym.building.service;

import com.codegym.building.model.account.Roles;

import java.util.List;

public interface TypeService<E>{
   List<E> findAll();

   E save(E e);
}
