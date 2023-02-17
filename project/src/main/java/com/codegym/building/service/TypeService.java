package com.codegym.building.service;


import java.util.List;

public interface TypeService<E>{
   List<E> findAll();

   E save(E e);
}
