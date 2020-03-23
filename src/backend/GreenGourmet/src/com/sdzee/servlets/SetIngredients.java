package com.sdzee.servlets;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sdzee.beans.IngredientsModel;
import com.sdzee.beans.UserModel;
import com.sdzee.form.IngredientsController;

/**
 * Servlet implementation class setIngredients
 */
@WebServlet("/setIngredients")
public class SetIngredients extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String page = "/WEB-INF/addIngredient.jsp";
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SetIngredients() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		this.getServletContext().getRequestDispatcher( this.page ).forward( request, response );
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		IngredientsController ingredientController = new IngredientsController();
		IngredientsModel ingredient = new IngredientsModel();
		UserModel user = new UserModel();
		
		String log = "";
		boolean isAdded = false;
		
		
		if(session.getAttribute("user") != null) {
			user = (UserModel) session.getAttribute("user");
			ingredient.setName(request.getParameter("name"));
			try {
				ingredient.setQuantity(Integer.parseInt(request.getParameter("quantity")));
			}catch(Exception e) {
				ingredient.setQuantity(0);
			}
			ingredient.setUnit(request.getParameter("unit"));
			ingredient.setExpirationDate(request.getParameter("expirationDate"));
			ingredient.setEssentialConsumption(request.getParameter("essentiel"));
			ingredient.setAlert(request.getParameter("alert"));
			
			isAdded = ingredientController.addIngredients(user, ingredient);
			if(session.getAttribute("isIngredientLoad") != null && isAdded) {
				ArrayList<IngredientsModel> listIngredients = user.getIngredientList();
				listIngredients.add(ingredient);
				user.setIngredientList(listIngredients);
				session.setAttribute("user", user);
			}
			log = ingredientController.getErreur();
		}else {
			log = "Il faut se connecter";
		}
		//On envoie à la page l'éventuelle message d'erreur et la fiche utilisateur
		request.setAttribute( "log", log );
		request.setAttribute( "isAdded", isAdded );
		request.setAttribute("user", user);
		
		doGet(request, response);
	}

}
