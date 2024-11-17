package m_tech.backEnd.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="comProds")
public class ComProd {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "product_id") // clé étrangère
    private Products product;

    @ManyToOne
    @JoinColumn(name = "commande_id")// clé étrangère
    private Commande commande;
}