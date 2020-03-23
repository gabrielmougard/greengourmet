package com.sdzee.beans;

public class IngredientsModel {
	private String id;
	private String name;
	private int quantity;
	private String unit;
	private String expirationDate;
	private String essentialConsumption;
	private String alert;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getExpirationDate() {
		return expirationDate;
	}
	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}
	public String getEssentialConsumption() {
		return essentialConsumption;
	}
	public void setEssentialConsumption(String essentialConsumption) {
		this.essentialConsumption = essentialConsumption;
	}
	public String getAlert() {
		return alert;
	}
	public void setAlert(String alert) {
		this.alert = alert;
	}

}
