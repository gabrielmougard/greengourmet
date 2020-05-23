package ggrecipes.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import ggrecipes.model.Recette;

public interface RecipeRepository extends MongoRepository<Recette, String>, RecipeRepositoryCustom {

	//public List<Recette> findByUserId(String userId);
	//public void deleteById(String id);

}