package m_tech.backEnd.services;

import m_tech.backEnd.models.*;
import m_tech.backEnd.repository.ComProdRepository;
import m_tech.backEnd.repository.CommandeRepository;
import m_tech.backEnd.repository.ProductRepository;
import m_tech.backEnd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.Instant;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class CommandeService {
    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private ComProdRepository comProdRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;
    public String passeCommand(List<Products> prod, Principal userName){

         UserEntity user = this.userRepository.findByUsername(userName.getName());
        prod.forEach((product) ->{
            ComProd comProd = new ComProd();
            Commande commande = new Commande();
            commande.setUser(user);
            commande.setStatus(Commande.Status.LOADING);
            commande.setDateCommande(Date.from(Instant.now()));
            comProd.setCommande(commande);
            this.commandeRepository.save(commande);
            comProd.setQuantity(product.getQuantity());
            comProd.setProduct(product);
            comProd.setCommande(commande);
            this.comProdRepository.save(comProd);
        });
         return "Commande Passed";
    }

    public void cancelCommand(Commande command) {
        Optional<Commande> myCommand = this.commandeRepository.findById(command.getId());
        if (myCommand.isPresent()) {
            this.commandeRepository.delete(myCommand.get()); // Supprime l'objet récupéré
        } else {
            throw new IllegalStateException("Command not exist");
        }
    }

    public void prepareCommand(Commande command){
        Optional<Commande> myCommand = this.commandeRepository.findById(command.getId());
        if (myCommand.isPresent()) {
            Commande existingCommand = myCommand.get(); // Récupérer l'objet existant
            existingCommand.setStatus(Commande.Status.FINISHED); // Mettre à jour le statut
            this.commandeRepository.save(existingCommand); // Sauvegarder la commande modifiée
        } else {
            throw new IllegalStateException("Command not found");
        }
    }

    public void livredCommande(Commande command){
        Optional<Commande> myCommand = this.commandeRepository.findById(command.getId());
        if (myCommand.isPresent()) {
            Commande existingCommand = myCommand.get(); // Récupérer l'objet existant
            existingCommand.setStatus(Commande.Status.LIVRED); // Mettre à jour le statut
            this.commandeRepository.save(existingCommand); // Sauvegarder la commande modifiée
        } else {
            throw new IllegalStateException("Command not found");
        }
    }

    public Iterable<Commande> allCommandNowByOneUser(UserEntity userPassedCommand){
        Iterable<Commande> allCommands = this.commandeRepository.findByUserId(userPassedCommand.getId());
        Iterator<Commande> iterator = allCommands.iterator();
        while (iterator.hasNext()){
            Commande commande = iterator.next();
            if (commande.getStatus() != Commande.Status.LOADING){
                iterator.remove();
            }
        }
        return  allCommands;
    }

}