package m_tech.backEnd.controllers;

import m_tech.backEnd.models.Products;
import m_tech.backEnd.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;
    @GetMapping("/all")
    public Iterable<Products> getAllProducts(){
        return this.productService.findAllProducts();
    }

    @PostMapping("/add")
    public Products addProducts(@RequestBody Products products){
        return  this.productService.addProducts(products);
    }

    @DeleteMapping("delete")
    public String  deleteProducts(@RequestBody Products products){
        this.productService.deleteProduct(products);
        return  "delete successfully";
    }
}
