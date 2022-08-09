package com.kgisl.ws.service;

import java.util.List;

import com.kgisl.ws.entity.User;
import com.kgisl.ws.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImp implements UserService{

    @Autowired
    public UserRepository userRepository;

    @Override
    public List<User> getUsers() {        
        return userRepository.findAll();
    }

    @Override
    public User findByUserId(Long id) {
        userRepository.findById(id);
        return userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
    }

    @Override
    public User createUser(User user) {        
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        // System.out.println("id ---------- > "+id);
        User s = userRepository.getById(id);
        s.setName(user.getName());
        s.setPassword(user.getPassword());
        s.setRole(user.getRole());
        s.setUserid(user.getUserid());
        s.setEmail(user.getEmail());

        userRepository.save(user);
        return userRepository.save(user);
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);        
    }
    
}