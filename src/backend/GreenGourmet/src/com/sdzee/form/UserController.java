package com.sdzee.form;

import java.sql.ResultSet;
import java.sql.SQLException;
import com.sdzee.bdd.ConnexionBDD;
import com.sdzee.beans.UserModel;

public class UserController {
	
	private String erreur = "ok";
	
	//Fonction de validation de l'inscription
	public boolean signUp(UserModel user){
		this.erreur = "ok";
		//Connection a la base de donnée
		ConnexionBDD BDD = new ConnexionBDD();
		
		//Le nom et le prenom respecte une longueur minimum
		if(user.getLastName().length()<1 || user.getName().length()<1) {
			this.erreur = "Il faut rentrer un nom et un prenom";
			return false;
		}
		
		BDD.Connect();
		//recuperations de toutes les adress mail
		ResultSet rs = BDD.Execute("SELECT (mail) from utilisateur");
		
		boolean isMailUsed = false;
		//L'adress mail n'est pas déjà utilisé
		try {
			while(rs.next()) {
				if(user.getMail().equals(rs.getString("mail"))) {
					this.erreur = "Cette adress mail est déjà utilisée";
					isMailUsed = true;
				}
			}
		} catch (SQLException e) {
		}
		BDD.Close();
		if(isMailUsed) {
			return false;
		}
		//Verification summaire qu'il s'agit bien d'un adress mail
		int pos = user.getMail().indexOf("@");
		int taille = user.getMail().length();
		if(taille<9 || pos < 3 || pos > taille-4) {
			this.erreur = "Adresse mail invalide";
			return false;
		}
		
		//Verification du mot de passe
		if(user.getPassword().length()< 6 || user.getPassword().length()>20) {
			this.erreur = "Le mot de passe doit faire entre 6 et 20 caractères";
			return false;
		}
		if(user.getPassword().equals(user.getPassword2())==false) {
			this.erreur = "Les deux mots de passes sont différents";
			return false;
		}
		
		BDD.Connect();
		//Ajout de l'utilisateur dans la base de donnée 
		BDD.Update("INSERT INTO utilisateur (nom, prenom, mail, motdepasse) VALUES ('"
				+ user.getName() + "', '" + user.getLastName() + "', '" + user.getMail() + "', '" 
				+ user.getPassword() +"');");
		
		//Fermeture de l'acces à la base de donnée
		BDD.Close();
		this.erreur = "";
		return true;
	}
	
	//Fonction pour récuperer les donnée utilisateur
	public UserModel getUserInfo(UserModel user) {
		
		IngredientsController ingredient = new IngredientsController();
		
		//Connection a la base de donnée 
		ConnexionBDD BDD = new ConnexionBDD();
		BDD.Connect();
		
		//Recuperation des donnée de l'utilisateur a partie de sont adress mail
		ResultSet rs = BDD.Execute("SELECT * FROM utilisateur WHERE mail = '" + user.getMail()  +"' ;");
		try {
			while(rs.next()) {
				user.setId(rs.getString("id"));
				user.setName(rs.getString("prenom"));
				user.setLastName(rs.getString("nom"));
			}
		}catch(Exception e) {
			this.erreur = "Impossible de charger votre profil";
		}
		
		//On afface le mot de passe de la fiche utiisateur(dangereux et inutile a garder)
		user.setPassword("");
		user.setPassword2("");
		BDD.Close();
		user.setIngredientList(ingredient.getIngredients(user));
		return user;
	}
	//Pour recuperer les erreur
	public String getErreur() {
		return erreur;
	}
	
	//Permet de valider la connexion
	public boolean signIn(UserModel user) {
		
		String password = user.getPassword();
		String password2 = null;
		//Connection a la base de donnée 
		ConnexionBDD BDD = new ConnexionBDD();
		BDD.Connect();
				
		//Recuperation des donnée de l'utilisateur a partie de sont adress mail
		ResultSet rs = BDD.Execute("SELECT * FROM utilisateur WHERE mail = '" + user.getMail()  +"' ;");
		boolean isProfilLoad = false;
		try {
			while(rs.next()) {
				password2 = rs.getString("motdepasse");
			}
			isProfilLoad = true;
		}catch(Exception e) {
			this.erreur = "Impossible de charger votre profil";
		}
		BDD.Close();
		if(isProfilLoad == false) {
			return false;
		}
		//Vérification du mot de passe
		if(password.equals(password2) && password != null) {
			return true;
		}else {
			this.erreur = "Connection refuse";
			return false;
		}
	}
	public boolean delAccount(UserModel user) {

		String password = user.getPassword();
		String password2 = null;
		//Connection a la base de donnée 
		ConnexionBDD BDD = new ConnexionBDD();
		BDD.Connect();
				
		//Recuperation des donnée de l'utilisateur a partie de sont adress mail
		ResultSet rs = BDD.Execute("SELECT * FROM utilisateur WHERE mail = '" + user.getMail()  +"' ;");
		boolean isProfilLoad = false;
		try {
			while(rs.next()) {
				password2 = rs.getString("motdepasse");
			}
			isProfilLoad = true;
		}catch(Exception e) {
			this.erreur = "Impossible de charger votre profil";
		}
		BDD.Close();
		if(isProfilLoad==false) {
			return false;
		}
		//Vérification du mot de passe
		if(password.equals(password2) && password != null) {
			BDD.Connect();
			BDD.Update("DELETE FROM `utilisateur` WHERE `mail` = '" + user.getMail()  +"' ;");
			BDD.Update("DELETE FROM `ingredient` WHERE `id_utilisateur` = '" + user.getId()  +"' ;");
			BDD.Close();
			return true;
		}else {
			this.erreur = "Mot de passe incorrecte";
			return false;
		}
		
	}
}
