package ggrecipes.model;

import java.io.Serializable;
import java.util.*;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class Request implements Serializable{
    private static final long serialVersionUID = 59455649129687880L;
    
    public List<String> ingredients;
    
    public List<String> getIngredients() {
        return this.ingredients;
    }

    public void setArticles(List<String> ingredients) {
        this.ingredients = ingredients;
    }

}