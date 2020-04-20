package ggscanner.model;

import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;

@Document(collection = "Item")
public class Item {
    private String barcode;
	private String name;
	private String brand;
	private ArrayList<Object> quantity = new ArrayList<Object>();
    private String manufacturingCountry;
	private String ingredients;
	private ArrayList<String> allergens = new ArrayList<String>(); 
	private ArrayList<String> traceAllergens = new ArrayList<String>();
	private ArrayList<String> additifs = new ArrayList<String>();
    private String nutritionalMark;
	private String kJ;
	
	public Item(){

	}
	public Item(String barcode){
		this.barcode = barcode;
	}
    public String getBarcode() {
		return barcode;
	}
	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public ArrayList<Object> getQuantity() {
		return quantity;
	}
	public void setQuantity(ArrayList<Object> quantity) {
		this.quantity = quantity;
	}
	public String getManufacturingCountry() {
		return manufacturingCountry;
	}
	public void setManufacturingCountry(String manufacturingCountry) {
		this.manufacturingCountry = manufacturingCountry;
	}
	public String getIngredients() {
		return ingredients;
	}
	public void setIngredients(String ingredients) {
		this.ingredients = ingredients;
	}
	public ArrayList<String> getAllergens(){
        return this.allergens;
    }
    public void setAllergens(ArrayList<String> allergens){
        this.allergens = allergens;
	}
	public ArrayList<String> getTraceAllergens(){
		return traceAllergens;
	}
	public void setTraceAllergens(ArrayList<String> traceAllergens){
		this.traceAllergens = traceAllergens;
	}
	public ArrayList<String> getAdditifs(){
        return this.additifs;
    }
    public void setAdditifs(ArrayList<String> additifs){
        this.additifs = additifs;
	}
	public String getNutritionalMark() {
		return nutritionalMark;
	}
	public void setNutritionalMark(String nutritionalMark) {
		this.nutritionalMark = nutritionalMark;
	}
	public void setKJ(String kJ) {
		this.kJ = kJ;
	}
	public String getKJ() {
		return kJ;
	}
}