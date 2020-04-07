package ggarticleserver.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import ggarticleserver.model.Article;

public interface ArticleRepository extends MongoRepository<Article, String>, ArticleRepositoryCustom {

	public List<Article> findByUserId(String userId);

	public void deleteById(String id);

}
