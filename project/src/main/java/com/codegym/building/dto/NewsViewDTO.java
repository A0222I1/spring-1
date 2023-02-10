package com.codegym.building.dto;

import com.codegym.building.model.news.News;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class NewsViewDTO {

    String title;

    String content;

    String avatar;


    public NewsViewDTO(News news) {
        this.title = news.getTitle();
        this.content = news.getContent();
        this.avatar = news.getAvatar();
    }
}
