package com.sdzee.servlets;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sdzee.beans.UserModel;
import com.sdzee.form.IngredientsController;

/**
 * Servlet implementation class GetIngredients
 */
@WebServlet("/GetIngredients")
public class GetIngredients extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private String page = "/WEB-INF/getIngredient.jsp";
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetIngredients() {
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
		UserModel user = new UserModel();
		String log;
		user.setId("3");
		if(session.getAttribute("user") != null /*&& session.getAttribute("isIngredientLoad") == null*/) {
			user = (UserModel) session.getAttribute("user");
			user.setIngredientList(ingredientController.getIngredients(user));
			session.setAttribute("user", user);
			session.setAttribute("isIngredientLoad", true);
			log = ingredientController.getErreur();
		}else {
			log="Il faut se connecter";
		}
		
		request.setAttribute("user", user);
		request.setAttribute("log", log);
		
		doGet(request, response);
	}

}
