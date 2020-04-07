package ggscanner.controller;

import ggscanner.model.Item;

import org.springframework.stereotype.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.PrintWriter;
import java.io.StringWriter;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlTitle;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.logging.Logger;
@RestController
public class ScannerController {
    @RequestMapping(value = "/scanner", method = RequestMethod.GET)
    public @ResponseBody String getItemGet(@RequestBody Item item) {
        return getItemPost(item);
    }
    @RequestMapping(value = "/scanner", method = RequestMethod.POST)
    public @ResponseBody String getItemPost(@RequestBody Item item) {
        ObjectMapper objectMapper = new ObjectMapper();
        WebClient client = new WebClient();

        String itemJson="";
        String[] itemElements;

        client.getOptions().setCssEnabled(false);
        client.getOptions().setJavaScriptEnabled(false);

        try {
            HtmlPage page = client.getPage("https://fr.openfoodfacts.org/produit/"+Long.toString(item.getBarcode()));
            HtmlTitle title = page.getFirstByXPath("//title");
            item.setStatus(page.getWebResponse().getStatusCode());
            itemElements = title.asText().split(" - ");
            item.setName(itemElements[0]);
            if(itemElements.length>2){
                item.setBrand(itemElements[itemElements.length-2]);
                item.setQuantity(itemElements[itemElements.length-1]);
            }else{
                item.setBrand(itemElements[itemElements.length-1]);
            }
        }catch(Exception e){
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            System.out.println(sw.toString());
            item.setStatus(500);
        }
        try{
            itemJson = objectMapper.writeValueAsString(item);
        }catch(Exception e){

        }
        return itemJson;
    }
}