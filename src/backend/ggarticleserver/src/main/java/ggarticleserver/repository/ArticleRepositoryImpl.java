package ggarticleserver.repository;

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

import ggarticleserver.model.Article;

@Repository
public class ArticleRepositoryImpl implements ArticleRepositoryCustom {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private static String collectionName = "Article";
	
	//cache operation
	private RedisTemplate<String, Object> redisTemplate;
	private HashOperations hashOperations;
	
	@Autowired
	public ArticleRepositoryImpl(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
        hashOperations = redisTemplate.opsForHash();
    }
	
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
		String ARTICLE_ID = "articleId";
		String USER_ID = "userId";
		String NAME = "name";
		String INGREDIENTS = "ingredients";
		String QUANTITY = "quantity";
		String QUANTITY_UNIT = "quantityUnit";
		String EXPIRING_DATE = "expiringDate";
		String BARCODE = "barcode";
		String REDIS_KEY = "ARTICLE";
	}
	
	@Override
	public Article updateById(String id, Article article) {
		
		Update update = new Update();
		update.set(Properties.USER_ID, article.getUserId());
		update.set(Properties.NAME, article.getName());
		update.set(Properties.INGREDIENTS, article.getIngredients());
		update.set(Properties.QUANTITY, article.getQuantity());
		update.set(Properties.QUANTITY_UNIT, article.getQuantityUnit());
		update.set(Properties.EXPIRING_DATE, article.getExpiringDate());
		update.set(Properties.BARCODE, article.getBarcode());
		
		//update the cache (when this method is called, the redisUUID field should not be empty)
		hashOperations.put(Properties.REDIS_KEY+":"+article.getUserId(), article.getRedisUUID(), article);
		
		//update mongoDB cluster
		return mongoTemplate.findAndModify(new Query(where(Properties.ARTICLE_ID).is(id)), update, 
				FindAndModifyOptions.options().upsert(false).returnNew(true), Article.class);
		
	}
	
	@Override
	public List<Article> findByUserId(String userId) {
		Map<String,Article> cachedArticles = hashOperations.entries(Properties.REDIS_KEY+":"+userId);
		if (cachedArticles != null) { // if something is stored in the cache cluster
			List<Article> articles = new ArrayList<Article>();
			for (Article article : cachedArticles.values()) {
				logger.info("Redis data fetched at : "+Properties.REDIS_KEY+":"+userId+":"+article.getArticleId());
				articles.add(article);
			}
			return articles;
		} else { //else, fetch data in mongoDB cluster
			logger.info("Fetching mongoDB");
			return mongoTemplate.find(new Query(where(Properties.USER_ID).is(userId)), Article.class);	
		}
	}
	
	@Override
	public int insert(List<Article> articles) {
		//create redisUUID and save in the redis cache
		int count = 0;
		for (Article article : articles) {
			String redisUUID = UUID.randomUUID().toString();
			article.setRedisUUID(redisUUID);
			article.setArticleId(redisUUID);
			logger.info("put in Redis");
			hashOperations.put(Properties.REDIS_KEY+":"+article.getUserId(), redisUUID, article);
			mongoTemplate.insert(article);
			count++;
		}
		
		return count;
	}
	
	@Override
	public void deleteById(String id) {
		
		Query query = new Query();
		query.addCriteria(Criteria.where(Properties.ARTICLE_ID).is(id));
		Article articleToDelete = mongoTemplate.findOne(query, Article.class);
		mongoTemplate.remove(articleToDelete);
		
		//delete in cache
		hashOperations.delete(Properties.REDIS_KEY+":"+articleToDelete.getUserId(), articleToDelete.getRedisUUID());
	}
	

}
