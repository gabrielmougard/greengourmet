<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
		<form action="http://localhost:8080/GreenGourmet/user/signIn" method="get">
									  <input type="submit" value="connexion" />
		</form>
 		<% 
    	/* Création d'une liste des produits alimentaire et insertion de quatre éléments */
    	//Une façon tres moche de proceder mais plus simple pour le moment 
    	//
    	java.util.List<com.sdzee.beans.IngredientsModel> ingredients = new java.util.ArrayList<com.sdzee.beans.IngredientsModel>();
 		com.sdzee.beans.UserModel user = new com.sdzee.beans.UserModel();
 
 		user = (com.sdzee.beans.UserModel) pageContext.findAttribute( "user" );
 		if(user != null){
	 		ingredients = user.getIngredientList();
	 		
	 		for(com.sdzee.beans.IngredientsModel ingredient: ingredients){
	 			out.println(ingredient.getName() + "\n");
	 		}
 		}
        %>
	<p>${ log }</p>
</body>
</html>