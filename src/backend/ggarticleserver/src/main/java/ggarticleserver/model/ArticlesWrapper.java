package ggarticleserver.model;

import java.util.*;

import java.io.Serializable;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class ArticlesWrapper implements Serializable {
    
    /**
     *
     */
    private static final long serialVersionUID = 5945564912965615240L;
    private List<Article> articles;

    public List<Article> getArticles() {
        return this.articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }

}