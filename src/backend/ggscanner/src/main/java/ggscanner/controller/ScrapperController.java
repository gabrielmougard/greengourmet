package ggscanner.controller;

import ggscanner.model.*;
import java.util.List;
import java.util.ArrayList;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.*;

public class ScrapperController {
    public Item scrapperItem(Request request,Response response){
        Item item = new Item();
        WebClient client = new WebClient();

        String[] itemElements;
        
        client.getOptions().setCssEnabled(false);
        client.getOptions().setJavaScriptEnabled(false);

        item.setBarcode(request.getBarcode());

        try{
            HtmlPage page = client.getPage("https://fr.openfoodfacts.org/produit/"+request.getBarcode());
            HtmlTitle title = page.getFirstByXPath("//title");
            HtmlDivision ingredients = (HtmlDivision) page.getByXPath("//div[@property='food:ingredientListAsText']").get(0);
            List<HtmlElement> traceAllergens = (List) page.getByXPath("//a[contains(@href, '/trace')]");
            List<HtmlElement> allergens = (List) page.getByXPath("//a[contains(@href, '/allergene')]");
            List<HtmlElement> additifs = (List) page.getByXPath("//a[contains(@href, '/additif')]");
            HtmlElement manufacturingCountry = page.getFirstByXPath("//a[contains(@href, '/lieu-de-fabrication')]");
            HtmlElement nutritionalMark = page.getFirstByXPath("//img[contains(@src, 'https://static.openfoodfacts.org/images/misc/nutriscore')]");
            HtmlElement kJ = page.getFirstByXPath("//td[@property='food:energyKjPer100g']");
            //property="food:energyKjPer100g"
            for(HtmlElement allergen : allergens){
                item.getAllergens().add(allergen.asText());
            }
            for(HtmlElement traceAllergen : traceAllergens){
                item.getTraceAllergens().add(traceAllergen.asText());
            }
            for(HtmlElement additif : additifs){
                item.getAdditifs().add(additif.asText());
            }
            itemElements = title.asText().split(" - ");
            item.setName(itemElements[0]);
            item.setBrand(itemElements[itemElements.length-2]);
            item.setQuantity(itemElements[itemElements.length-1]);
            item.setManufacturingCountry(manufacturingCountry.asText());
            item.setIngredients(ingredients.asText());
            item.setNutritionalMark(nutritionalMark.getAttribute("src"));
            item.setKJ(kJ.asText());
            response.setStatus(page.getWebResponse().getStatusCode());
        }catch(Exception e){
            response.setStatus(500);
        }
        return item;
    }
}