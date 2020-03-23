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
 * Servlet implementation class ConnexionUser
 */
@WebServlet("/user/signIn")
public class SignIn extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private String page = "/WEB-INF/NewUser.jsp";
    private String pageSignIn = "/WEB-INF/NewUser.jsp";
    private String pageSignInValid = "/WEB-INF/NewUser.jsp";
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SignIn() {
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
		HttpSession session = request.getSession(true);
		//Création du model et du controller
		UserModel user = new UserModel();
		UserController userController = new UserController();
		
		String log = "";
		boolean isSignIn = false;
		
		if(session.getAttribute("user") == null && request.getParameter("mail") != null) {
			//On enregistre le mot de passe et le mail
			user.setMail(request.getParameter("mail"));
			user.setPassword(request.getParameter("password"));
			
			//les donnée entrée sont elle valident
			isSignIn = userController.signIn(user);
			
			//Si le connexions est accepté on crée une session et on enregistre les données de l'utilisateur
			if(isSignIn) {
				user = userController.getUserInfo(user);
				session.setAttribute("user", user);
				session.setAttribute("SignIn", true);
				this.page=this.pageSignInValid;
				log = userController.getErreur();
			}else {
				this.page=this.pageSignIn;
				log="nop";
			}
		}else {
			this.page=this.pageSignInValid;
			log ="non";
		}
		//On peut choisir la redirection après la connexion
		/*if(request.getParameter("page") != "" && session.getAttribute("SignIn") != null) {
			this.page = request.getParameter("page");
		}*/
		//Récuperations des erreurs
		
		
		//Envoie des log d'erreur de l'utilisateur a la page
		request.setAttribute( "log", log );
		request.setAttribute( "isSignIn", isSignIn );
		request.setAttribute("user", user);
		
		doGet(request, response);
	}

}
