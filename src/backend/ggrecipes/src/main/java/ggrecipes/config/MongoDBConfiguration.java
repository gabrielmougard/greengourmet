package ggrecipes.config;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import com.mongodb.MongoClient;

import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

@SuppressWarnings("deprecation")
@Profile(value = { "production", "dev" })
@Configuration
public class MongoDBConfiguration extends AbstractMongoConfiguration {

	@Value("${spring.data.mongodb.host}")
	private String mongoHost;

	@Value("${spring.data.mongodb.port}")
	private String mongoPort;

	@Value("${spring.data.mongodb.database}")
	private String mongoDB;
	
	@Value("${spring.data.mongodb.user}")
	private String user;
	
	@Value("${spring.data.mongodb.password}")
	private String password;

	@Override
	public MongoMappingContext mongoMappingContext() throws ClassNotFoundException {
		return super.mongoMappingContext();
	}
	
	@Bean
    public MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate(mongoClient(), getDatabaseName());
    }

	@Bean
	@Override
	public MongoClient mongoClient() {
		
		return new MongoClient(mongoHost + ":" + mongoPort);
		
	}

	@Override
	protected String getDatabaseName() {
		return mongoDB;
	}

}
