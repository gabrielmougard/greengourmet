package com.sdzee.bdd;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ConnexionBDD{
		private String url = "jdbc:mysql://localhost:3306/greengourmet";
		private String utilisateur = "utilisateur";
		private String motDePasse = "mot_de_passe";
        String Data="";
        private Connection cn=null;
        //Statement st=null;
        private java.sql.Statement st = null;

        public void ParametreBase(String url, String user, String password){
            this.url=url;
            this.utilisateur=user;
            this.motDePasse=password;
        }
        
        public Boolean Connect(){
            try {
                Class.forName("com.mysql.jdbc.Driver");
                this.cn = DriverManager.getConnection(this.url, this.utilisateur, this.motDePasse);
                this.st = this.cn.createStatement();
                return true;
            } catch (SQLException ex) {
            	 System.out.print("-------------------------------------------------------------------");
            } catch (ClassNotFoundException ex) {
            	System.out.print("---------------------------------");
            }
            return false;
        }
        
        public ResultSet Execute (String SqlString){
            try {
                ResultSet rs = this.st.executeQuery(SqlString);
                return rs;
            } catch (SQLException ex) {
            }
            return null;
        }
        
        public int Update (String SqlString){
            try {
                int rs = this.st.executeUpdate(SqlString);
                return rs;
            } catch (SQLException ex) {
            }
            return 0;
        }
        
        public void Close(){
            try {
                this.st.close();
                this.cn.close();
            } catch (SQLException ex) {
            }
        }
        
    }
