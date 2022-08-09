package com.kgisl.ws.service;

import java.util.List;

import com.kgisl.ws.entity.User;

public interface UserService {
    public List<User> getUsers();
    public User findByUserId(Long id);
    public User createUser(User team);
    public User updateUser(Long id,User team);
    public void deleteUserById(Long id);  
}
