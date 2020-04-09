package ggscanner.model;


import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.PropertySource;
//import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import javax.annotation.PostConstruct;
//import org.springframework.stereotype.Component;
//import org.springframework.beans.factory.annotation.Autowired;

public class WebScrapperPath {

    @Value("${scrapper.url}")    
    public String scrapperUrl = "https://fr.openfoodfacts.org/produit/";
    public String title = "//title";
    public String manufacturingCountry = "//a[contains(@href, '/lieu-de-fabrication')]";
    public String brand = "//a[contains(@href, '/marque')]";
    public String ingredients = "//div[@property='food:ingredientListAsText']";
    public String traceAllergens = "//a[contains(@href, '/trace')]";
    public String allergens = "//a[contains(@href, '/allergene')]";
    public String additifs = "//a[contains(@href, '/additif')]"; 
    public String nutritionalMark = "//img[contains(@src, 'https://static.openfoodfacts.org/images/misc/nutriscore')]";
    public String kJ = "//td[@property='food:energyKjPer100g']";
    

}