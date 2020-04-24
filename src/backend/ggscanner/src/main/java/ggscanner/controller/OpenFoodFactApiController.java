package ggscanner.controller;

import ggscanner.model.*;

import com.gargoylesoftware.htmlunit.*;
import com.gargoylesoftware.htmlunit.html.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.Map;
import java.util.ArrayList;

@Configuration
public class OpenFoodFactApiController {

    private ObjectMapper mapper = new ObjectMapper();
    private WebClient client = new WebClient();
 
    @Value("${openFoodFact.url}")
    public String url;
    @Value("${openFoodFact.informationFormat}")
    public String informationFormat;
    @Value("${openFoodFact.barcodeKey}")
    public String barcodeKey;
    @Value("${openFoodFact.productKey}")
    public String productKey;
    @Value("${openFoodFact.nameKey}")
    public String nameKey;
    @Value("${openFoodFact.ingredientsKey}")
    public String ingredientsKey;
    @Value("${openFoodFact.brandKey}")
    public String brandKey;
    @Value("${openFoodFact.quantityKey}")
    public String quantityKey;
    @Value("${openFoodFact.manufacturingCountryKey}")
    public String manufacturingCountryKey;
    @Value("${openFoodFact.allergensKey}")
    public String allergensKey;
    @Value("${openFoodFact.traceAllergensKey}")
    public String traceAllergensKey;
    @Value("${openFoodFact.additifsKey}")
    public String additifsKey;
    @Value("${openFoodFact.nutritionalMarkKey}")
    public String nutritionalMarkKey;
    @Value("${openFoodFact.nutritionalMarkUrl}")
    public String nutritionalMarkUrl;
    @Value("${openFoodFact.nutritionalMarkFormat}")
    public String nutritionalMarkFormat;
    @Value("${openFoodFact.nutrimentsKey}")
    public String nutrimentsKey;
    @Value("${openFoodFact.energyKJKey}")
    public String energyKJKey;
    @Value("${openFoodFact.energyUnit}")
    public String energyUnit;

    

    public Item getItemByBarcode(String barcode, Response response){
        Item item = new Item(barcode);
        try{
            Map<String, Object> map = getJson(barcode, response);
            setGlobalInfo(item, map);
            setQuantity(item, map);
            setItemNutritionalMark(item, map);
            setItemKJ(item, map);
        }catch (Exception e) {
            response.setStatus(500);
            item = null;
        }
        return item;
    }
    private Map<String, Object> getJson(String barcode, Response response) throws Exception {
        Page page = client.getPage(url+barcode+informationFormat);
        WebResponse webResponse = page.getWebResponse();
        String json = webResponse.getContentAsString();
        response.setStatus(page.getWebResponse().getStatusCode());
        if (webResponse.getContentType().equals("application/json")) {
            Map<String, Object> map = (Map<String, Object>) mapper.readValue(json, Map.class);
            return map;
        }else{
            return null;
        }
    }
    private void setItemNutritionalMark(Item item, Map<String, Object> map){
        try{
            map = (Map<String, Object>) map.get(productKey);
            String nutriScore = (String) map.get(nutritionalMarkKey);
            if(nutriScore != null){
                nutriScore = nutritionalMarkUrl+nutriScore+nutritionalMarkFormat;
            }
            item.setNutritionalMark(nutriScore);
        }catch (Exception e) {
        }
        
    }
    private void setItemKJ(Item item, Map<String, Object> map){
        try{
            map = (Map<String, Object>) map.get(productKey);
            map = (Map<String, Object>) map.get(nutrimentsKey);
            String kJ = Integer.toString((int) map.get(energyKJKey));
            if(kJ != null){
                kJ = kJ + " " +energyUnit;
            }
            item.setKJ(kJ);
        }catch (Exception e) {

        }
    }
    private void setQuantity(Item item, Map<String, Object> map){
        map = (Map<String, Object>) map.get(productKey);
        String[] quantity = ((String) map.get(quantityKey)).split(" ");
        if(quantity.length>0){
            item.getQuantity().add(Float.parseFloat(quantity[0]));
        }if(quantity.length>1){
            item.getQuantity().add(quantity[1]);
        }
    }
    private void setGlobalInfo(Item item, Map<String, Object> map){
        //item.setBarcode((String) map.get(barcodeKey));
        map = (Map<String, Object>) map.get(productKey);
        item.setName((String) map.get(nameKey));
        item.setIngredients((String) map.get(ingredientsKey));
        item.setBrand((String) map.get(brandKey));
        item.setManufacturingCountry((String) map.get(manufacturingCountryKey));
        item.setAllergens((ArrayList<String>) map.get(allergensKey));
        item.setTraceAllergens((ArrayList<String>) map.get(traceAllergensKey));
        item.setAdditifs((ArrayList<String>) map.get(additifsKey));
    }

}