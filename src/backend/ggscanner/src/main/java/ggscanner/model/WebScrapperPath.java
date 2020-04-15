package ggscanner.model;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebScrapperPath {
    @Value("${scrapper.url}")
    public String scrapperUrl;// = "https://fr.openfoodfacts.org/produit/";
    @Value("${scrapper.title}")
    public String title; // = "//title";
    @Value("${scrapper.titleSplit}")
    public String titleSplit;
    @Value("${scrapper.manufacturingCountry}")
    public String manufacturingCountry; // = "//a[contains(@href, '/lieu-de-fabrication')]";
    @Value("${scrapper.brand}")
    public String brand; // = "//a[contains(@href, '/marque')]";
    @Value("${scrapper.ingredients}")
    public String ingredients; // = "//div[@property='food:ingredientListAsText']";
    @Value("${scrapper.traceAllergens}")
    public String traceAllergens; // = "//a[contains(@href, '/trace')]";
    @Value("${scrapper.allergens}")
    public String allergens; // = "//a[contains(@href, '/allergene')]";
    @Value("${scrapper.additifs}")
    public String additifs; // = "//a[contains(@href, '/additif')]"; 
    @Value("${scrapper.nutritionalMark}")
    public String nutritionalMark; // = "//img[contains(@src, 'https://static.openfoodfacts.org/images/misc/nutriscore')]";
    @Value("${scrapper.kJ}")
    public String kJ; // = "//td[@property='food:energyKjPer100g']";

} 