package ggscanner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
//import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

/*@Entity
@Table(name = "item", uniqueConstraints = {
})*/
public class Item {
    private int status;
    private Long userId;
    private Long barcode;
    @Column(nullable = false)
    private String name;
    private String quantity;
    private String brand;
    private String manufacturingCountry;
    private String ingredients;
    private String nutritionalMark;
    private String kcal;
    private String allergen;
    
    public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
        this.status = status;
    }
    public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
    public Long getBarcode() {
		return barcode;
	}
	public void setBarcode(Long barcode) {
		this.barcode = barcode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
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
	public String getKcal() {
		return kcal;
	}
	public void setKcal(String kcal) {
		this.kcal = kcal;
	}
	public String getNutritionalMark() {
		return nutritionalMark;
	}
	public void setNutritionalMark(String nutritionalMark) {
		this.nutritionalMark = nutritionalMark;
    }
    public String getAllergen(){
        return this.allergen;
    }
    public void setAllergen(String allergen){
        this.allergen = allergen;
    }
}