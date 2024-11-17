package m_tech.backEnd.controllers;

import m_tech.backEnd.configurations.SpringSecurityConfig;
import m_tech.backEnd.models.UserEntity;
import m_tech.backEnd.services.AuthService;
import m_tech.backEnd.services.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private JWTService jwtService;



    @PostMapping("/registry")
    public  UserEntity registry(@RequestBody UserEntity user){
        return this.authService.SaveUser(user);
    }

    @GetMapping("/admin")
    public  String getAdmin(){
        return "admin";
    }

    @GetMapping("/client")
    public  String getClient(){
        return "client";
    }
    @GetMapping("/seller")
    public  String getSeller(){
        return "seller";
    }

    @GetMapping("/chef")
    public String getChef(){
        return "chef";
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> getToken(Authentication authentication){
        // Perform authentication and return JWT token
        String token = jwtService.generateJwt(authentication);
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }
}
