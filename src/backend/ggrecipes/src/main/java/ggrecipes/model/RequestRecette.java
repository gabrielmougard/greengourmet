package ggrecipes.model;

import java.io.Serializable;
import java.util.*;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class RequestRecette implements Serializable {
    private static final long serialVersionUID = 594556543529687880L;
    
    public String link;
    
    public String getLink() {
        return this.link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}