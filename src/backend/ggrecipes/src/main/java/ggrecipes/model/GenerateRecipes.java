package ggrecipes.model;

import java.util.List; // import just the List interface
import java.util.ArrayList; // import just the ArrayList class
import java.util.Map; // import just the List interface
import java.util.HashMap;
//import org.junit.Assert;
//import static org.junit.Assert.*;
//import org.junit.Test;
import java.util.regex.*;
import com.gargoylesoftware.htmlunit.WebRequest;
import com.gargoylesoftware.htmlunit.WebResponse;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.Page;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import com.gargoylesoftware.htmlunit.html.HtmlDivision;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;
import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.SilentCssErrorHandler;
import com.gargoylesoftware.htmlunit.StringWebResponse;

import org.apache.commons.io.FileUtils;
//import org.junit.Before;

import ch.qos.logback.core.net.SyslogOutputStream;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.io.*;

//import static org.junit.Assert.assertNotNull;

public class GenerateRecipes {
    // public List<String> ingredients = new ArrayList<String>();
    public List<String> steps = new ArrayList<String>();
    public String title;
    public String temps;
    public Float personnes;
    public String difficulte;
    public String cout;
    public List<String> ustensiles = new ArrayList<String>();
    public int status = 200;
    public Map<String, Float> ingredients = new HashMap<>();
    // public Map<String,ArrayList<String>> recettes = new HashMap<>();

    public Recette Recipe(String url) {
        WebClient webClient = webClientCreator();
        Recette recette = new Recette();
        try {
            HtmlPage page = (HtmlPage) webClient.getPage(url);
            status = page.getWebResponse().getStatusCode();
            List<HtmlElement> ingredientsHtml = page.getByXPath("//span[(@class='ingredient')]");
            List<HtmlElement> quantitéHtml = page.getByXPath("//span[contains(@class, 'recipe-ingredient-qt')]");

            for (int i = 0; i < ingredientsHtml.size(); i++) {
                try {
                    ingredients.put(ingredientsHtml.get(i).asText(), Float.parseFloat(quantitéHtml.get(i).asText()));

                } catch (Exception e) {
                    ingredients.put(ingredientsHtml.get(i).asText(), null);
                }

            }
            recette.ingredients = ingredients;

            List<HtmlElement> stepsHtml = page.getByXPath("//li[contains(@class, 'recipe-preparation__list')]");
            for (HtmlElement i : stepsHtml) {
                steps.add(i.asText());
            }
            recette.steps = steps;

            List<HtmlElement> ustensilesHtml = page.getByXPath("//span[contains(@class, 'recipe-utensil__name')]");
            for (HtmlElement i : ustensilesHtml) {
                ustensiles.add(i.asText().substring(0, i.asText().length() - 2));
            }
            recette.ustensiles = ustensiles;

            List<HtmlElement> tempsHtml = page
                    .getByXPath("//span[contains(@class, 'title-2 recipe-infos__total-time__value')]");
            temps = tempsHtml.get(0).asText();
            recette.temps = temps;

            List<HtmlElement> personnesHtml = page
                    .getByXPath("//span[contains(@class, 'title-2 recipe-infos__quantity__value')]");
            try {
                personnes = Float.parseFloat(personnesHtml.get(0).asText());
            } catch (Exception e) {
                personnes = .0f;
            }

            recette.personnes = personnes;

            List<HtmlElement> difficulteHtml = page.getByXPath("//div[(@class='recipe-infos__level')]");
            try {
                difficulte = difficulteHtml.get(0).asText();
            } catch (Exception e) {
                difficulte = "";
            }
            recette.difficulte = difficulte;

            List<HtmlElement> coutHtml = page.getByXPath("//div[(@class='recipe-infos__budget')]");
            try {
                cout = coutHtml.get(0).asText();
            } catch (Exception e) {
                cout = "";
            }
            recette.cout = cout;

            List<HtmlElement> titleHtml = page.getByXPath("//h1[(@class='main-title ')]");
            title = titleHtml.get(0).asText();
            recette.name = title;

        } catch (Exception e) {
            status = 404;
        }
        // protection for memory leak
        webClient.close();
        return recette;
    }

    public GenerateRecipes(Map<String, Float> ingredients, ArrayList<String> steps, ArrayList<String> ustensiles,
            String title, String temps, Float personnes, String difficulte, String cout) {
        this.ingredients = ingredients;
        this.steps = steps;
        this.title = title;
        this.temps = temps;
        this.personnes = personnes;
        this.difficulte = difficulte;
        this.cout = cout;
        this.ustensiles = ustensiles;
    }

    public GenerateRecipes() {

    }

    private WebClient webClientCreator() {
        WebClient webClient = new WebClient();
        webClient.getOptions().setCssEnabled(true);
        webClient.setCssErrorHandler(new SilentCssErrorHandler());
        webClient.getOptions().setThrowExceptionOnFailingStatusCode(true);
        webClient.getOptions().setThrowExceptionOnScriptError(false);
        webClient.getOptions().setRedirectEnabled(false);
        webClient.getOptions().setAppletEnabled(false);
        webClient.getOptions().setJavaScriptEnabled(false);
        webClient.getOptions().setPopupBlockerEnabled(true);
        webClient.getOptions().setTimeout(5000);
        webClient.getOptions().setPrintContentOnFailingStatusCode(false);
        return webClient;
    }
}