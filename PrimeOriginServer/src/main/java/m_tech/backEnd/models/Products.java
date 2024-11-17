package m_tech.backEnd.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name="Products")
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private int id;
    private String Name_Product;
    private String Code_Product;
    private  String url_Product;
    private int quantity;
    private float price;
}
