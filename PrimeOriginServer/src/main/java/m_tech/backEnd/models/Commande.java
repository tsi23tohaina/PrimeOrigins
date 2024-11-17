package m_tech.backEnd.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "commandes")
public class Commande {
    public enum Status {
        LOADING,
        FINISHED,
        LIVRED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="commande_id")
    private int id;
    private Date dateCommande;
    private Date dateLivraison;
    @Enumerated(EnumType.STRING) // Ajout de cette annotation
    private Status status;
    @ManyToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "fk_user_id", referencedColumnName = "id")
    private UserEntity user;
}
