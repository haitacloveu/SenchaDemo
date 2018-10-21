/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import java.io.Serializable;
import java.sql.*;
/**
 *
 * @author junge
 */
public class Utils implements Serializable{
    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/senchademo", "root", "1234");
        return conn;
    }
    public static void closeConnection(Connection conn, PreparedStatement preStm, ResultSet rs) {
        try {
            if (rs != null) {
                rs.close();
            }
            if (preStm != null) {
                preStm.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
            System.out.println("Util closeConnection " + e.getMessage());
        }
    }
}
