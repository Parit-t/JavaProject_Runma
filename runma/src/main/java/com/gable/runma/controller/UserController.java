package com.gable.runma.controller;
import com.gable.runma.model.User;

import com.gable.runma.service.UserService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;


    @GetMapping("/{id}")
    User findOne(@PathVariable Integer id) {
        return userService.getUser(id);
    }

    @PostMapping("/")
    public User newUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    User update(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        if (userService.validateUser(user.getEmail(), user.getPassword())) {
            return ResponseEntity.ok("เข้าสู่ระบบสำเร็จ!");
        } else {
            return ResponseEntity.badRequest().body("Email หรือ Password ไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง");
        }
    }
    @PostMapping("/findByEmail")
    public User getByEmail(@RequestBody Map<String, String> requestBody) {
        String userEmail = requestBody.get("userEmail");
        if (userEmail == null || userEmail.isEmpty()) {
            throw new RuntimeException("Email address cannot be null or empty.");
        }
        return userService.findByEmail(userEmail);
    }
}
