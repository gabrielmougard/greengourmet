package ggscanner;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServerPortCustomizer implements WebServerFactoryCustomizer<ConfigurableWebServerFactory>{
    
    @Value("${server.port}")
    private int port;

    @Override
    public void customize(ConfigurableWebServerFactory factory) {
        factory.setPort(this.port);
    }
}