package com.codegym.building.service.impl;

import com.codegym.building.model.news.News;
import com.codegym.building.repos.NewsRepos;
import com.codegym.building.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsServiceImpl implements TypeService<News> {

    @Autowired
    NewsRepos newsRepos;

    @Override
    public List<News> findAll() {
        return newsRepos.findAll();
    }

    @Override
    public News save(News news) {
        return null;
    }
}
