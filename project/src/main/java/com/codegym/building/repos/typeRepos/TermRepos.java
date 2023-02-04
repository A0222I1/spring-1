package com.codegym.building.repos.typeRepos;

import com.codegym.building.model.typeClass.Term;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TermRepos extends JpaRepository<Term, Integer> {
}
