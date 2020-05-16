package ggrecipes.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;

import java.io.File;
import java.io.IOException;
import java.net.URL;

import ggrecipes.model.*;

import java.util.*;

@RestController
public class GreetingController {
		private GenerateRecipes generateRecipes;
	private GetRecipes getRecipes;

	@PostMapping("/getListRecipes")
	public @ResponseBody Response postGetListRecipes(@RequestBody Request request) throws IOException{
		return getListRecipes(request);
	}

	@GetMapping("/getListRecipes")
	public @ResponseBody Response getListRecipes(@RequestBody Request request)  throws IOException {
		getRecipes = new GetRecipes();
		Response response = new Response();
		response.recettes = getRecipes.GetRecipesDescription(request.Ingredients);
		response.status = getRecipes.status;
		// response.recettes = generateRecipes.getListRecettes();
		return response;
	}
	@PostMapping("/getRecipe")
	public @ResponseBody Response postGetRecipes(@RequestBody Recette recette) throws IOException{
		return getRecipe(recette);
	}
	@GetMapping("/getRecipe")
	public @ResponseBody Response getRecipe(@RequestBody Recette recette) throws IOException {
		generateRecipes = new GenerateRecipes();
		Response response = new Response();
		response.status = 200;
		response.recettes.add(generateRecipes.Recipe(recette.MarmittonURL));
		return response;
	}
	@GetMapping("/testList")
	public Response testList(){
		ArrayList<String> ingrList = new ArrayList<String>();
		Response response = new Response();
		ingrList.add("oeuf");
		getRecipes = new GetRecipes();
		response.recettes = getRecipes.GetRecipesDescription(ingrList);
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
