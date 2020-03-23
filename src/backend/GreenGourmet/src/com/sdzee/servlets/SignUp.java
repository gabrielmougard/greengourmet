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
 * Servlet implementation class User
 */
@WebServlet("/user/signUp")
public class SignUp extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private String page = "/WEB-INF/NewUser.jsp";
	private String pageSignUp =  "/WEB-INF/NewUser.jsp";
	private String pageSignUpValid = "/WEB-INF/NewUser.jsp";
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SignUp() {
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
		response.getWriter().append("Served at: ").append(request.getContextPath());
		//Création du model et du controller
		HttpSession session = request.getSession(true);
		UserModel newUser = new UserModel();
		UserController userController = new UserController();
		
		//Elements 
		String log = "";
		boolean isSignUp = false;
		
		if(session.getAttribute("user") == null) {
			//Création de la fiche d'utilisateur
			newUser.setName(request.getParameter("name"));
			newUser.setLastName(request.getParameter("lastName"));
			newUser.setMail(request.getParameter("mail"));
			newUser.setPassword(request.getParameter("password"));
			newUser.setPassword2(request.getParameter("password2"));
			
			//Insxription renvoie True si les information envoyé sont valide et du l'utilisateur est inscrit
			isSignUp = userController.signUp(newUser);
			
			//On supprime le mot de passe pour ne pas qu'il se balade dans la nature
			newUser.setPassword("");
			newUser.setPassword2("");
			
			//Inscription validé dans ce cas on crée un session avec les donnée de l'utilisateur
			if(isSignUp) {
				newUser = userController.getUserInfo(newUser);
				session.setAttribute("user", newUser);
				session.setAttribute("SignIn", true);
				this.page = this.pageSignUpValid;
			}else {
				this.page = this.pageSignUp;
			}
		}else {
			this.page = this.pageSignUpValid;
		}
		//On peut choisir la redirection après la connexion
		/*if(request.getParameter("page") != "" && session.getAttribute("SignIn") != null) {
			this.page = request.getParameter("page");
		}*/
		
		//On recupere le log de connexion
		log = userController.getErreur();
		
		//On envoie à la page l'éventuelle message d'erreur et la fiche utilisateur
		request.setAttribute( "log", log );
		request.setAttribute( "isSignUp", isSignUp );
		request.setAttribute("user", newUser);
		
		//
		doGet(request, response);
	}

}
