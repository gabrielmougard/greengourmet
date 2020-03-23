package com.sdzee.beans;

import java.util.ArrayList;

public class UserModel {
	private String id;
	private String name;
	private String lastName;
	private String mail;
	private String password;
	private String password2;
	private ArrayList<IngredientsModel> ingredientList = new ArrayList<IngredientsModel>();
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPassword2() {
		return password2;
	}
	public void setPassword2(String password2) {
		this.password2 = password2;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public ArrayList<IngredientsModel> getIngredientList() {
		return ingredientList;
	}
	public void setIngredientList(ArrayList<IngredientsModel> ingredientList) {
		this.ingredientList = ingredientList;
	}
	
}
