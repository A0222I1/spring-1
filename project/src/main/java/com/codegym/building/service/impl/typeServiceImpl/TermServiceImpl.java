package com.codegym.building.service.impl.typeServiceImpl;

import com.codegym.building.model.typeClass.Term;
import com.codegym.building.repos.typeRepos.TermRepos;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TermServiceImpl implements TypeService<Term> {
    @Autowired
    TermRepos termRepos;
    @Override
    public List<Term> findAll() {
        return termRepos.findAll();
    }

    @Override
    public Term save(Term term) {
        return null;
    }
}
