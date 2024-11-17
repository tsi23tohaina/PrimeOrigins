package m_tech.backEnd.controllers;

import m_tech.backEnd.configurations.SpringSecurityConfig;
import m_tech.backEnd.models.Commande;
import m_tech.backEnd.models.Products;
import m_tech.backEnd.services.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/command")
public class CommandeController {
    @Autowired
    private CommandeService commandeService;
    @Autowired
    private SpringSecurityConfig springSecurityConfig;

   @PostMapping("/passed")
    public ResponseEntity<Map<String, String>> passedCommad(@RequestBody List<Products> prod , Principal user){
       this.commandeService.passeCommand(prod,user);
       String texte = "thanks " + user.getName();
       Map<String, String> response = new HashMap<>();
       response.put("response", texte);
       return ResponseEntity.ok(response);
   }


   @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCommand(@RequestBody Commande command){
       this.commandeService.cancelCommand(command);
       String response = "delete command successfully";
       return ResponseEntity.ok(response);
   }
}
