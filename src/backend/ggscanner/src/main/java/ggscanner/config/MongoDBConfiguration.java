package ggscanner.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SuppressWarnings("deprecation")
@Configuration
@EnableMongoRepositories(basePackages = "ggscanner.repository")
public class MongoDBConfiguration extends AbstractMongoConfiguration {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

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
	public Mongo mongo() throws Exception {
		MongoCredential credential = MongoCredential.createCredential(this.user,this.mongoDB,this.password.toCharArray());
		//MongoClientOptions options = MongoClientOptions.builder().sslEnabled(true).build();
		logger.info("les credentials : "+this.user+ " && "+this.mongoDB+" && "+this.password.toCharArray());
		return new MongoClient(new ServerAddress(this.mongoHost, Integer.parseInt(this.mongoPort)),
								Arrays.asList(credential));
		//return new MongoClient(mongoHost + ":" + mongoPort);
	}

	@Override
	protected String getDatabaseName() {
		return mongoDB;
	}

	@Override
	public MongoClient mongoClient() {
		MongoCredential credential = MongoCredential.createCredential(this.user,this.mongoDB,this.password.toCharArray());
		//MongoClientOptions options = MongoClientOptions.builder().sslEnabled(true).build();
		logger.info("les credentials : "+this.user+ " && "+this.mongoDB+" && "+this.password.toCharArray());
		return new MongoClient(new ServerAddress(this.mongoHost, Integer.parseInt(this.mongoPort)),
								Arrays.asList(credential));
		//return new MongoClient(mongoHost + ":" + mongoPort);
	}
}
