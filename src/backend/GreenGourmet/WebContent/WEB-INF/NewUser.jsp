<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Test</title>
    </head> 
    <body>
        <form action="http://localhost:8080/GreenGourmet/user/signIn" method="post">
				<p>Entrez votre prénom : 		 <input type="text" name="name" /></p>
				<p>Entrez votre nom :    		 <input type="text" name="lastName"/></p>
				<p>Entrez votre mail :	 		 <input type="text" name="mail"/></p>
				<p>Entrez votre mot de passe :	 <input type="password" name="password"/></p>
				<p>Confirmation de mot de passe :<input type="password" name="password2"/></p>
									  <input type="submit" value="valider" />
		</form>
		<form action="http://localhost:8080/GreenGourmet/user/signOut" method="post">
									  <input type="submit" value="deconnexion" />
		</form>
		<form action="http://localhost:8080/GreenGourmet/setIngredients" method="get">
									  <input type="submit" value="ajouter ingredients" />
		</form>
		<form action="http://localhost:8080/GreenGourmet/user/DelAccount" method="post">
		<p>Entrez votre mot de passe :	 <input type="password" name="password"/></p>
									  <input type="submit" value="suprimer le compte" />
		</form>
		<form action="http://localhost:8080/GreenGourmet/GetIngredients" method="post">
		<p>Entrez votre mot de passe :	 <input type="password" name="password"/></p>
									  <input type="submit" value="Get List Ingredients" />
		</form>
            <p>${ log }</p>
    </body>
</html>