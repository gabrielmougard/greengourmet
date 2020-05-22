package ggrecipes.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;

import java.io.File;
import java.io.IOException;
import java.net.URL;

import javax.validation.Valid;

import ggrecipes.model.*;

import java.util.*;

@RestController
@RequestMapping("/recipes")
public final class GreetingController {
	private GenerateRecipes generateRecipes;
	private GetRecipes getRecipes;
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@RequestMapping(value = "/getListRecipes", method = RequestMethod.POST)
	Response postGetListRecipes(@RequestBody @Valid RequestIngredients request) throws IOException{
		getRecipes = new GetRecipes();
		Response response = new Response();
		response.recettes = getRecipes.GetRecipesDescription(request.getIngredients(), request.getStartIdx());
		response.status = getRecipes.status;
		return response;
	}

	@RequestMapping(value = "/getRecipeDetails", method = RequestMethod.POST)
	Response getRecipe(@RequestBody @Valid RequestRecette request) throws IOException {
		generateRecipes = new GenerateRecipes();
		Response response = new Response();
		response.status = 200;
		response.recettes.add(generateRecipes.Recipe(request.getLink()));
		return response;
	}

	@GetMapping("/testList")
	public Response testList(){
		ArrayList<String> ingrList = new ArrayList<String>();
		Response response = new Response();
		ingrList.add("oeuf");
		getRecipes = new GetRecipes();
		response.recettes = getRecipes.GetRecipesDescription(ingrList, 0);
		response.status = getRecipes.status;
		// response.recettes = generateRecipes.getListRecettes();
		return response;
	}
	@GetMapping("/testRecipe")
	public Response testRecipe(){
		generateRecipes = new GenerateRecipes();
		Response response = new Response();
		response.status = 200;
		response.recettes.add(generateRecipes.Recipe(
			"https://www.marmiton.org/recettes/recette_petits-gateaux-aux-blancs-d-oeuf-restes-de-blanc-d-oeuf_30830.aspx"));
		return response;
	}
}
