package ggrecipes.repository;

import org.springframework.stereotype.Repository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.mongodb.core.query.Update;
import static org.springframework.data.mongodb.core.query.Criteria.where;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import ggrecipes.model.Recette;

@Repository
public class RecipeRepositoryImpl implements RecipeRepositoryCustom {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private static String collectionName = "Recette";

    //cache operation
	//private RedisTemplate<String, Object> redisTemplate;
	//private HashOperations hashOperations;
    
    /*
	@Autowired
	public RecipeRepositoryImpl(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
        hashOperations = redisTemplate.opsForHash();
    }
    */

    @Override
    public String getCollectionName() {
        return collectionName;
    }

    @Override
    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }
    
	@Autowired
    MongoTemplate mongoTemplate;
    
    static interface Properties {
        String NAME = "name";
        String TAGS = "tags";
        String NB_COMMENTS = "nb_comments";
        String COOK_TIME = "cook_time";
        String DESCRIPTION = "description";
        String IMAGEURL = "imageURL";
        String MARMITTONURL = "MarmittonURL";
        String RECOMMENDATION = "recommendation";
        String STEPS = "steps";
        String TITLE = "title";
        String TEMPS = "temps";
        String PERSONNES = "personnes";
        String DIFFICULTE = "difficulte";
        String COUT = "cout";
        String USTENSILES = "ustensiles";
        String INGREDIENTS = "ingredients";
        String RECETTES = "recettes";
		String REDIS_KEY = "RECIPE";
    }
    
    
    @Override
    public Recette updateByURL(String url, Recette recette) {
        //TODO
        return null;
    }
    

    @Override
    public List<Recette> findByURL(String url) {
        //TODO
        return null;
    }

    @Override
    public int insert(List<Recette> recettes) {
        //TODO
        //create redisUUID and save in the redis cache
        /*
        int count = 0;
        for (Recette recette : recettes) {
            String redisUUID = UUID.randomUUID().toString();
            recette.set
        }

        return count;
        */
        return 0;
    }

    @Override
    public void deleteByURL(String url) {
        //TODO
        /*
        Query query = new Query();
        query.addCriteria(Criteria.where(Properties.MARMITTONURL).is(url));
        Recette recetteToDelete = mongoTemplate.findOne(query, Recette.class);
        mongoTemplate.remove(recetteToDelete);

        //delete in cache
        hashOperations.delete(Properties.REDIS_KEY+":"+recetteToDelete.MarmittonURL);
        */
        
    }
    
    
}