package com.codegym.building.repos;

import com.codegym.building.model.news.News;
import com.codegym.building.model.plane.Plane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NewsRepos extends JpaRepository<News,Integer> {
    @Query(value = "SELECT * FROM news n order by n.id desc limit 6 ;",nativeQuery = true)
    List<News> findAll();
}
