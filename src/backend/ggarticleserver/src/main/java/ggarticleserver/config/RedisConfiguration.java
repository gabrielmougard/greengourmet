package ggarticleserver.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericToStringSerializer;

@Configuration
@EnableRedisRepositories
public class RedisConfiguration extends CachingConfigurerSupport{
	
	@Value("${spring.data.redis.host}")
	private String hostName;
	
	@Value("${spring.data.redis.port}")
	private int port;
	
	@Value("${spring.data.redis.password}")
	private String password;
	
	@SuppressWarnings("deprecation")
	@Bean
    JedisConnectionFactory jedisConnectionFactory() {
        JedisConnectionFactory jedisConFactory
        	= new JedisConnectionFactory();
        jedisConFactory.setHostName(this.hostName);
        jedisConFactory.setPort(this.port);
        jedisConFactory.setPassword(this.password);
        return jedisConFactory;
    }

    @Bean
    @ConditionalOnMissingBean(name = "redisTemplate")
    public RedisTemplate<String, Object> redisTemplate() {
        final RedisTemplate<String, Object> template = new RedisTemplate<String, Object>();
        template.setConnectionFactory(jedisConnectionFactory());
        template.setValueSerializer(new GenericToStringSerializer<Object>(Object.class));
        return template;
    }
}
