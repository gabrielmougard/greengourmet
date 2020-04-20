package ggscanner.controller;

import ggscanner.model.*;

import java.util.List;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ScrapperController {
    @Autowired
    private WebScrapperPath path;// = new WebScrapperPath();

    public Item scrapperItem(String barcode,Response response){
        
        Item item = new Item(barcode);
        try{ 
            HtmlPage page = getPage(path.scrapperUrl + barcode);
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
    private HtmlPage getPage(String url) throws Exception {
        WebClient client = new WebClient();

        client.getOptions().setCssEnabled(false);
        client.getOptions().setJavaScriptEnabled(false);

        HtmlPage page = client.getPage(url);
        return page;
    }
    private void setTraceAllergens(Item item, HtmlPage page){
        List<HtmlElement> traceAllergens = (List) page.getByXPath(path.traceAllergens);
        for(HtmlElement traceAllergen : traceAllergens){
            item.getTraceAllergens().add(traceAllergen.asText());
        }
    }
    private void setAllergens(Item item, HtmlPage page){
        List<HtmlElement> allergens = (List) page.getByXPath(path.allergens);
        for(HtmlElement allergen : allergens){
            item.getAllergens().add(allergen.asText());
        }
    }
    private void setAdditifs(Item item, HtmlPage page){
        List<HtmlElement> additifs = (List) page.getByXPath(path.additifs);
        for(HtmlElement additif : additifs){
            item.getAdditifs().add(additif.asText());
        }
    }
    private void setManufacturingCountry(Item item, HtmlPage page){
        HtmlElement manufacturingCountry = page.getFirstByXPath(path.manufacturingCountry);
        if(manufacturingCountry != null){ 
            item.setManufacturingCountry(manufacturingCountry.asText());
        }
    }
    private void setNutritionalMark(Item item, HtmlPage page){
        HtmlElement nutritionalMark = page.getFirstByXPath(path.nutritionalMark);
        if(nutritionalMark != null){
            item.setNutritionalMark(nutritionalMark.getAttribute("src"));
        }
    }
    private void setKJ(Item item, HtmlPage page){
        HtmlElement kJ = page.getFirstByXPath(path.kJ);
        if(kJ != null){
            item.setKJ(kJ.asText());
        }
    }
    private void setIngredients(Item item, HtmlPage page){
        HtmlDivision ingredients = (HtmlDivision) page.getByXPath(path.ingredients).get(0);
        if(ingredients != null){
            item.setIngredients(ingredients.asText());
        }
    }
    private void setBrand(Item item, HtmlPage page){
        List<HtmlElement> brands = (List) page.getByXPath(path.brand);
        for(HtmlElement brand : brands){
            if(brand.asText().equals(item.getName())==false){
                item.setBrand(brand.asText());
            }
        }
    }
    private void setGlobalInfo(Item item, HtmlPage page) throws Exception {
        String[] itemElements;
        String titleSplit = path.titleSplit.substring(1, path.titleSplit.length()-2);
        HtmlTitle title = page.getFirstByXPath(path.title);
        if(title != null){
            itemElements = title.asText().split(titleSplit);
            item.setName(itemElements[0]);
            setQuantity(item, itemElements);
            if(itemElements.length>2){
                item.setBrand(itemElements[itemElements.length-2]);
            }else{
                setBrand(item, page);
            }
        }
    }
    private void setQuantity(Item item, String[] itemElements){
        String[] quantity;
        if(itemElements.length>1){
            quantity = itemElements[itemElements.length-1].split(" ");
            for(String q : quantity){
                try{
                    item.getQuantity().add(Float.parseFloat(q));
                }catch(Exception e){
                    if(q.equals("")==false){
                        item.getQuantity().add(q);
                    }
                }
            }
        }
    }
}