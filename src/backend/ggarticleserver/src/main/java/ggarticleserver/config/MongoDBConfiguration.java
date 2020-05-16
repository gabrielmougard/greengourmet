package ggarticleserver.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.WriteConcern;

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
		
		//List<MongoCredential> auths = new ArrayList<MongoCredential>();
		//ServerAddress serverAddress = new ServerAddress(mongoHost);
		//MongoCredential auth = MongoCredential.createPlainCredential(this.user, this.mongoDB, this.password.toCharArray());
		//auths.add(auth);
		//return new MongoClient(serverAddress, auths);
		return new MongoClient(mongoHost + ":" + mongoPort);
		
		
		//List<MongoCredential> allCred = new ArrayList<MongoCredential>();
        //System.out.println("???????????????????"+user+" "+mongoDB+" "+password+" "+mongoHost+" "+mongoPort);
        //allCred.add(MongoCredential.createCredential(user, mongoDB, password.toCharArray()));
        //MongoClient client = new MongoClient((new ServerAddress(mongoHost, Integer.parseInt(mongoPort))), allCred);
        //client.setWriteConcern(WriteConcern.ACKNOWLEDGED);

        //return client;
	}

	@Override
	protected String getDatabaseName() {
		return mongoDB;
	}

}
