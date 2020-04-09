package ggscanner.controller;

import ggscanner.model.*;
import java.util.List;
import java.util.ArrayList;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.*;

public class ScrapperController {

    public WebScrapperPath path = new WebScrapperPath();

    public Item scrapperItem(Request request,Response response){
        
        Item item = new Item(request.getBarcode());
        try{
            HtmlPage page = getPage(path.scrapperUrl + request.getBarcode());
            setGlobalInfo(item, page);
            setManufacturingCountry(item, page);
            setNutritionalMark(item, page);
            setIngredients(item, page);
            setTraceAllergens(item, page);
            setAllergens(item, page);
            setAdditifs(item, page);
            setKJ(item, page);
            response.setStatus(page.getWebResponse().getStatusCode());
        }catch(Exception e){
            response.setStatus(500);
            item = null;
        }
        return item;
    }
    public HtmlPage getPage(String url) throws Exception{
        WebClient client = new WebClient();

        client.getOptions().setCssEnabled(false);
        client.getOptions().setJavaScriptEnabled(false);

        HtmlPage page = client.getPage(url);
        return page;
    }
    public void setTraceAllergens(Item item, HtmlPage page){
        List<HtmlElement> traceAllergens = (List) page.getByXPath(path.traceAllergens);
        for(HtmlElement traceAllergen : traceAllergens){
            item.getTraceAllergens().add(traceAllergen.asText());
        }
    }
    public void setAllergens(Item item, HtmlPage page){
        List<HtmlElement> allergens = (List) page.getByXPath(path.allergens);
        for(HtmlElement allergen : allergens){
            item.getAllergens().add(allergen.asText());
        }
    }
    public void setAdditifs(Item item, HtmlPage page){
        List<HtmlElement> additifs = (List) page.getByXPath(path.additifs);
        for(HtmlElement additif : additifs){
            item.getAdditifs().add(additif.asText());
        }
    }
    public void setManufacturingCountry(Item item, HtmlPage page){
        HtmlElement manufacturingCountry = page.getFirstByXPath(path.manufacturingCountry);
        if(manufacturingCountry != null){ 
            item.setManufacturingCountry(manufacturingCountry.asText());
        }
    }
    public void setNutritionalMark(Item item, HtmlPage page){
        HtmlElement nutritionalMark = page.getFirstByXPath(path.nutritionalMark);
        if(nutritionalMark != null){
            item.setNutritionalMark(nutritionalMark.getAttribute("src"));
        }
    }
    public void setKJ(Item item, HtmlPage page){
        HtmlElement kJ = page.getFirstByXPath(path.kJ);
        if(kJ != null){
            item.setKJ(kJ.asText());
        }
    }
    public void setIngredients(Item item, HtmlPage page){
        HtmlDivision ingredients = (HtmlDivision) page.getByXPath(path.ingredients).get(0);
        if(ingredients != null){
            item.setIngredients(ingredients.asText());
        }
    }
    public void setGlobalInfo(Item item, HtmlPage page){
        String[] itemElements;
        HtmlTitle title = page.getFirstByXPath(path.title);
        if(title != null){
            itemElements = title.asText().split(" - ");
            item.setName(itemElements[0]);
            if(itemElements.length>1){
                item.setQuantity(itemElements[itemElements.length-1]);
            }
            if(itemElements.length>2){
                item.setBrand(itemElements[itemElements.length-2]);
            }else{
                List<HtmlElement> brands = (List) page.getByXPath(path.brand);
                for(HtmlElement brand : brands){
                    if(brand.asText().equals(item.getName())==false){
                        item.setBrand(brand.asText());
                    }
                }
            }
        }
    }
}