/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hoald.entity;

import java.io.Serializable;

/**
 *
 * @author junge
 */
public class RegistrationDTO implements Serializable{
    private String username;
    private String password;
    private String fullname;
    private String role;
    private boolean leaf;

    public RegistrationDTO(String username, String fullname, String role) {
        this.username = username;
        this.fullname = fullname;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }
    
}
