package ggrecipes.model;

import java.util.*;

import java.io.IOException;
import java.util.ArrayList;
public class Recette {

	public String name;
	public ArrayList<String> tags;
	public ArrayList<String> nb_comments;
	public String cook_time;
	public String description;
	public String imageURL;
	public String MarmittonURL;
	public String recommendation;

	public List<String> steps;
    public String title;
    public String temps;
    public Float personnes;
    public String difficulte;
    public String cout;
    public List<String> ustensiles;
    public Map<String, Float> ingredients;
    public Map<String,ArrayList<String>> recettes;


	//bollean use to know if the recipies is completly parse
	public Boolean RecetteComplette=false;
/*
	public Recette(String MarmittonURL,Map<String, Float> ingredients,ArrayList<String> steps,String name,ArrayList<String> tags,ArrayList<String> nb_comments,String cook_time) {
		this.ingredients=ingredients;
		this.steps=steps;
		this.name=name;
		this.tags=tags;
		this.nb_comments=nb_comments;
		this.cook_time=cook_time;
	}*/
	public Recette(){

	}
} 