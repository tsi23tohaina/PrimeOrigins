package m_tech.backEnd.services;

import m_tech.backEnd.models.Products;
import m_tech.backEnd.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Products addProducts(Products prod){
        return  this.productRepository.save(prod);
    }
    public  void deleteProduct(Products products){
           this.productRepository.delete(products);
    }

    public Iterable<Products> findAllProducts() {
        return this.productRepository.findAll();
    }
}
