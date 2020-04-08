package ggscanner.controller;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;

import com.fasterxml.jackson.databind.ObjectMapper;

import ggscanner.repository.ItemRepository;
import ggscanner.model.*;

@SpringBootApplication
@RestController
public class ScannerController {
    @Autowired
    private ItemRepository repository;
    private ScrapperController scrapper = new ScrapperController();

    @RequestMapping(value = "/scanner", method = RequestMethod.GET)
    public @ResponseBody String getItemGet(@RequestBody Request request) {
        return getItemPost(request);
    }
    @RequestMapping(value = "/scanner", method = RequestMethod.POST)
    public @ResponseBody String getItemPost(@RequestBody Request request) {
        
        Item item = null; //repository.findByBarcode(request.getBarcode());
        Response response = new Response(item);

        if(item==null){
            item = scrapper.scrapperItem(request, response);
            response.setItem(item);
            //repository.save(item);
        }
        return responseToString(response);
    }

    public String responseToString(Response response){
        ObjectMapper objectMapper = new ObjectMapper();
        try{
            return objectMapper.writeValueAsString(response);
        }catch(Exception e){
            return "{\"status\":500}";
        }
    }
}