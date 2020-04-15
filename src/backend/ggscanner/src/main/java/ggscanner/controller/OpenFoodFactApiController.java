package ggscanner.controller;

import ggscanner.model.*;

import com.gargoylesoftware.htmlunit.*;
import com.gargoylesoftware.htmlunit.html.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;
import java.util.ArrayList;

public class OpenFoodFactApiController {

    private ObjectMapper mapper = new ObjectMapper();
    private WebClient client = new WebClient();

    private String url;

    public Item getItemByBarcode(String barcode){
        Item item = new Item();
        try{
            Map<String, Object> map = getJson(barcode);
            item.setBarcode((String) map.get("code"));
            map = (Map<String, Object>) map.get("product");
            item.setName((String) map.get("product_name"));
            item.setIngredients((String) map.get("ingredients_text_fr"));
            item.setBrand((String) map.get("brands"));
            item.setQuantity((String) map.get("quantity"));
            item.setManufacturingCountry((String) map.get("manufacturing_places"));
            item.setAllergens((ArrayList<String>) map.get("allergens_tags"));
            item.setTraceAllergens((ArrayList<String>) map.get("traces_tags"));
            item.setAdditifs((ArrayList<String>) map.get("additives_tags"));//"nutrition_grade_fr"
            String nutriScore = (String) map.get("nutrition_grade_fr");
            nutriScore = "https://static.openfoodfacts.org/images/misc/nutriscore-"+nutriScore+".svg";
            item.setNutritionalMark(nutriScore);
            map = (Map<String, Object>) map.get("nutriments");
            item.setKJ(Integer.toString((int) map.get("energy-kj_100g")) +" kJ");//
            return item;
        }catch (Exception e) {
            return null;
        }
        
        
    }
    private Map<String, Object> getJson(String barcode) throws Exception {
        Page page = client.getPage("https://world.openfoodfacts.org/api/v0/product/"+barcode+".json");
        WebResponse webResponse = page.getWebResponse();
        String json = webResponse.getContentAsString();
        if (webResponse.getContentType().equals("application/json")) {
            Map<String, Object> map = (Map<String, Object>) mapper.readValue(json, Map.class);
            return map;
        }else{
            return null;
        }
    }
    

}