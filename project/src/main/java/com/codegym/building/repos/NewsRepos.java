package com.codegym.building.repos;

import com.codegym.building.model.news.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepos extends JpaRepository<News,Integer> {

}
