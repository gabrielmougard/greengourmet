package ggscanner.controller;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;

import ggscanner.repository.ItemRepository;
import ggscanner.model.*;
 
import javax.validation.Valid;

@RestController
//@RequestMapping("/scanner")
public class ScannerController {
    @Autowired
    private ItemRepository repository;
    @Autowired
    private ScrapperController scrapper;// = new ScrapperController();
    @Autowired
    private OpenFoodFactApiController openFoodFactApi;// = new OpenFoodFactApiController();
    
    @RequestMapping(value = "/scanner", method = RequestMethod.GET)
    public @ResponseBody Response getItemGet(@RequestBody Request request) {
        return getItemPost(request);
    }

    @RequestMapping(value = "/scanner", method = RequestMethod.POST)
    public @ResponseBody Response getItemPost(@RequestBody Request request) {
        Item item = getItemFromBDD(request.getBarcode());        
        Response response = new Response();

        if(item==null){
            item = getItem(request.getBarcode(), response);
            saveItemInBDD(item);
        }
        response.setItem(item);
        return response;
    }
    
    private Item getItemFromBDD(String barcode){
        try{
            return repository.findByBarcode(barcode); 
        } catch (Exception e) {
            return null;
        }
    }
    private void saveItemInBDD(Item item){
        if(item != null){
            try{
                repository.save(item);
            } catch (Exception e) {
            }
        }
    }
    private Item getItem(String barcode, Response response){
        Item item = null;
        item = openFoodFactApi.getItemByBarcode(barcode, response);
        if(item==null){
            item = scrapper.scrapperItem(barcode, response);
        }
        return item;
    }

}