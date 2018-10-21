/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import hoald.entity.RegistrationDTO;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import utils.Utils;

/**
 *
 * @author junge
 */
public class RegistrationDAO implements Serializable {

    private PreparedStatement preStm;
    private Connection conn;
    private ResultSet rs;

    public boolean insert(String username, String password, String fullname, String role) throws Exception {
        boolean check = false;
        try {
            String sql = "INSERT INTO registration VALUES (?,?,?,?)";
            conn = Utils.getConnection();
            System.out.println(conn);
            preStm = conn.prepareStatement(sql);
            preStm.setString(1, username);
            preStm.setString(2, password);
            preStm.setString(3, fullname);
            preStm.setString(4, role);
            check = preStm.executeUpdate() > 0;
        } finally {
            Utils.closeConnection(conn, preStm, rs);
        }
        return check;
    }
    
    public List<RegistrationDTO> getAllAccount() throws Exception {
        List<RegistrationDTO> result = null;
        try {
            String sql = "SELECT username, fullname, role FROM registration";
            conn = Utils.getConnection();
            preStm = conn.prepareStatement(sql);
            rs = preStm.executeQuery();
            String username = null;
            String fullname = null;
            String role = null;
            result = new ArrayList<>();
            while (rs.next()) {
                username = rs.getString("username");
                fullname = rs.getString("fullname");
                role = rs.getString("role");
                RegistrationDTO dto = new RegistrationDTO(username, fullname, role);
                dto.setLeaf(true);
                result.add(dto);
            }
        } finally {
            Utils.closeConnection(conn, preStm, rs);
        }
        return result;
    }
}
