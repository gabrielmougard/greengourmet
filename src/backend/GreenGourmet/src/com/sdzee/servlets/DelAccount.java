package com.sdzee.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sdzee.beans.UserModel;
import com.sdzee.form.UserController;

/**
 * Servlet implementation class DelAccount
 */
@WebServlet("/user/DelAccount")
public class DelAccount extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String page = "/WEB-INF/NewUser.jsp";
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DelAccount() {
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
		// TODO Auto-generated method stub
				HttpSession session = request.getSession(true);
				//Création du model et du controller
				UserModel user = new UserModel();
				UserController userController = new UserController();
				
				String log = "";
				boolean isAccoundDelete = false;
				
				if(session.getAttribute("user") != null && request.getParameter("password") != null) {
					//On enregistre le mot de passe et le mail
					user = (UserModel) session.getAttribute("user");
					user.setPassword(request.getParameter("password"));
					
					isAccoundDelete = userController.delAccount(user);
					
					session.invalidate();
					
					//Récuperations des erreurs
					log = userController.getErreur();
				}else {
					log = "Connecté vous";
				}
				//On peut choisir la redirection après la connexion
				/*if(request.getParameter("page") != "" && session.getAttribute("SignIn") != null) {
					this.page = request.getParameter("page");
				}*/
				
				
				//Envoie des log d'erreur de l'utilisateur a la page
				request.setAttribute( "log", log );
				request.setAttribute( "isAccoundDelete", isAccoundDelete );
				request.setAttribute("user", user);
		doGet(request, response);
	}

}
