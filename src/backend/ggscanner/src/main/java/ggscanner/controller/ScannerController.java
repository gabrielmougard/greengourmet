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
@RequestMapping("/scanner")
public class ScannerController {
    @Autowired
    private ItemRepository repository;
    private ScrapperController scrapper = new ScrapperController();

    @RequestMapping(value = "/scanner", method = RequestMethod.GET)
    public @ResponseBody Response getItemGet(@RequestBody Request request) {
        return getItemPost(request);
    }

    @PostMapping("/barcode")
    public @ResponseBody Response getItemPost(@Valid @RequestBody Request request) {
        Item item = null;
        try{
            item = repository.findByBarcode(request.getBarcode()); 
        } catch (Exception e) {
        }
        
        Response response = new Response(item);

        if(item==null){
            item = scrapper.scrapperItem(request, response);
            response.setItem(item);
            if(item != null){
                try{
                    repository.save(item);
                } catch (Exception e) {
                }
            }
        }
        return response;
    }

}