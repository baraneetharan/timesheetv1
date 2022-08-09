package com.kgisl.ws.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.kgisl.ws.entity.User;
import com.kgisl.ws.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@EnableAspectJAutoProxy(proxyTargetClass = true)
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    public UserService userService;

    @GetMapping("/")
    public @ResponseBody ResponseEntity<List<User>> getAll() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    // login validation
    @PostMapping(value = "/uservalidation", headers = "Accept=application/json")
    public @ResponseBody ResponseEntity<List<User>> getUserDetails(@RequestBody User currentUser) {
        // System.out.println("uname+pwd
        // --------->"+currentUser.name+currentUser.password);
        List<User> loginUser = userService.getUsers().stream()
                .filter(x -> x.name.equals(currentUser.name) && x.password.equals(currentUser.password))
                .collect(Collectors.toList());
        // System.out.println(loginUser);
        return new ResponseEntity<>(loginUser, HttpStatus.OK);
    }

    @GetMapping("/nonadmins")
    public @ResponseBody ResponseEntity<List<User>> getAllUsers() {
        List<User> userOnly = userService.getUsers().stream().filter(x -> x.role.equals("U"))
                .collect(Collectors.toList());
        System.out.println(userOnly);
        return new ResponseEntity<>(userOnly, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getTeamById(@PathVariable("id") long id) {
        User user = userService.findByUserId(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping(value = "/", headers = "Accept=application/json")
    public ResponseEntity<User> createTeam(@RequestBody User user) {
        User actualUser = userService.createUser(user);
        HttpHeaders headers = new HttpHeaders();
        // headers.setLocation(ucBuilder.path("/{id}").buildAndExpand(team.getTeamid()).toUri());
        return new ResponseEntity<>(actualUser, headers, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", headers = "Accept=application/json")
    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User currentUser) {
        User user = userService.updateUser(id, currentUser);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}", headers = "Accept=application/json")
    public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) {
        User user = userService.findByUserId(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.deleteUserById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
