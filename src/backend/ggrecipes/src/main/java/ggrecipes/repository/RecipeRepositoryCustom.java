package ggrecipes.repository;

import java.util.List;

import ggrecipes.model.Recette;

public interface RecipeRepositoryCustom {
    
    public int insert(List<Recette> recettes);
	public void deleteByURL(String url);
	public Recette updateByURL(String url, Recette recette);
	public List<Recette> findByURL(String userId);
	public String getCollectionName();
    void setCollectionName(String collectionName);
}