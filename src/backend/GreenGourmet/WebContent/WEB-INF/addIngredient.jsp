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
        <form action="http://localhost:8080/GreenGourmet/setIngredients" method="post">
				<p>Nom du produit : 		<input type="text" name="name" /></p>
				<p>quantité :    		   <input type="text" name="quantity"/></p>
				<p>unité :	 		 	   <input type="text" name="unit"/></p>
				<p>date de peremption :	   <input type="date" name="expirationDate"/></p>
				<p>consomation importante :<input type="text" name="essentiel"/></p>
				<p>alert :					<input type="text" name="alert"/></p>
									  <input type="submit" value="valider" />
		</form>
		<form action="http://localhost:8080/GreenGourmet/user/signIn" method="get">
									  <input type="submit" value="Connexion" />
		</form>
            <p>${ log }</p>
    </body>
</html>