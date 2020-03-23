package com.sdzee.form;

import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.sdzee.bdd.ConnexionBDD;
import com.sdzee.beans.IngredientsModel;
import com.sdzee.beans.UserModel;

public class IngredientsController {
	private String erreur = "ok";
	
	public boolean addIngredients(UserModel user, IngredientsModel ingredient) {
		
		//Test des valeurs ou des valeurs et application des valeurs par defaut
		if(ingredient.getName()=="") {
			this.erreur = "Nom imcomplet";
			return false;
		}if(ingredient.getEssentialConsumption().equals("0") == false) {
			ingredient.setEssentialConsumption("1");
		}if(ingredient.getAlert().equals("1") == false) {
			ingredient.setAlert("0");
		}if(ingredient.getUnit() == "") {
			ingredient.setUnit("g");
		}if(ingredient.getQuantity() == 0) {
			this.erreur = "Il manque la quantité";
			return false;
		}
		
		//Verification du format de la date
		SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		SimpleDateFormat df2 = new SimpleDateFormat("yyyy/MM/dd");
		String strdate = ingredient.getExpirationDate();
        try {
            Date date = df.parse(strdate);
        } catch (Exception e) {
        	try {
                Date date = df2.parse(strdate);
            } catch (Exception e1) {
            	this.erreur = "Date invalid";
                return false;
            }
        }
        ConnexionBDD BDD = new ConnexionBDD();
        BDD.Connect();
        //Verification de la presence du produit dans la base de donnée
        ResultSet rs = BDD.Execute("SELECT * FROM ingredient WHERE id_utilisateur = '" + user.getId()  +"' ;");
        boolean add = false;
        /*try {
        	int quantity = ingredient.getQuantity();
			while(rs.next()) {
				if(rs.getString("nom").toLowerCase().equals(ingredient.getName().toLowerCase())) {
					ingredient.setId(rs.getString("id"));
					quantity = quantity + Integer.parseInt(rs.getString("quantite"));
					ingredient.setQuantity(quantity);
					add = true;
					break;
				}
			}
		}catch(Exception e) {
			this.erreur = "Impossible d'acceder a vos produits";
		}*/
        //Ajout dans la base de donnée
		try {
			if(add) {
				//Decommanter les lignes au dessus et ajouter un BDD.Update(UPDATE... et pas INSERT
			}else {
				BDD.Update("INSERT INTO ingredient (id_utilisateur, nom, quantite, unite, date_de_peremption, comsomation_importante, alerte) VALUES ('"
						+ user.getId() + "', '" + ingredient.getName() + "', '" + ingredient.getQuantity()
						+ "', '" + ingredient.getUnit() + "', '"+ ingredient.getExpirationDate() +
						"', '"+ ingredient.getEssentialConsumption()+"', '"+ ingredient.getAlert() +"');");
			}
		}catch(Exception e) {
			this.erreur = "Ajout impossible";
		}
		BDD.Close();
		return true;
	}
	
	public ArrayList<IngredientsModel> getIngredients(UserModel user) {
		ArrayList<IngredientsModel> ingredientsList = new ArrayList<IngredientsModel>();
		ConnexionBDD BDD = new ConnexionBDD();
		IngredientsModel ingredient;
		
		BDD.Connect();
		
		ResultSet rs = BDD.Execute("SELECT * FROM ingredient WHERE id_utilisateur = '" + user.getId()  +"' ;");
		try {
			while(rs.next()) {
				ingredient = new IngredientsModel();
				ingredient.setId(rs.getString("id"));
				ingredient.setName(rs.getString("nom"));
				ingredient.setQuantity(rs.getInt("quantite"));
				ingredient.setUnit(rs.getString("unite"));
				ingredient.setExpirationDate(rs.getString("date_de_peremption"));
				ingredient.setEssentialConsumption(rs.getString("comsomation_importante"));
				ingredient.setAlert(rs.getString("alerte"));
				ingredientsList.add(ingredient);
			}
		}catch(Exception e) {
			this.erreur = "Impossible d'acceder au produits";
		}
		BDD.Close();
		return ingredientsList;
	}
	public boolean delIngredients(ArrayList<IngredientsModel> ingredients) {
		
		return true;
	}
	public String getErreur() {
		return erreur;
	}
}
