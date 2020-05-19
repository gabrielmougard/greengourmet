package ggarticleserver.repository;

import java.util.ArrayList;
import java.util.List;

import ggarticleserver.model.Article;

public interface ArticleRepositoryCustom {
	
	public int insert(List<Article> articles);
	
	public void deleteById(String id);
	
	public Article updateById(String id, Article article);
	
	public List<Article> findByUserId(String userId);
	
	public String getCollectionName();

    void setCollectionName(String collectionName);
}
