package com.esiea.fr.backendfullstackprojet.controller;
import com.esiea.fr.backendfullstackprojet.model.Article;
import com.esiea.fr.backendfullstackprojet.model.Category;
import com.esiea.fr.backendfullstackprojet.service.ArticleService;
import com.esiea.fr.backendfullstackprojet.service.CategoryService;
import com.esiea.fr.backendfullstackprojet.service.NotAllowedException;
import com.esiea.fr.backendfullstackprojet.service.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/private/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ArticleService articleService;

    @GetMapping("")
    public Iterable<Category> getCategories(){
        return categoryService.getCategories();
    }

    @GetMapping("/{categoryID}")
    public ResponseEntity<Category> getCategory(@PathVariable("categoryID") Long id) {
        try {
            Category category = categoryService.getCategorie(id);
            return new ResponseEntity<Category>(category, HttpStatus.OK );
        } catch (NotFoundException e) {
            return new ResponseEntity<Category>(HttpStatus.NOT_FOUND );
        }
    }

    @PostMapping("")
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        try {
            Category newCategory = categoryService.create(category);
            return new ResponseEntity<Category>(newCategory, HttpStatus.OK);
        }catch (NotAllowedException e) {
            return new ResponseEntity<Category>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Category> deleteCategory(@PathVariable("id") Long id){
        try {
            categoryService.delete(id);
            return new ResponseEntity<Category>(HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("")
    public ResponseEntity<Category> replaceCategory(@RequestBody Category category)
    {
        try {
            Category updatedCategory = categoryService.replace(category);
            return new ResponseEntity<Category>(updatedCategory, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{idCategory}/{idArticle}")
    public ResponseEntity<Category> addArticleToCategory(
            @PathVariable(name = "idCategory") Long idCategory,
            @PathVariable(name = "idArticle") Long idArticle){

        try {
            Category category = categoryService.getCategorie(idCategory);
            Article article = articleService.getArticle(idArticle);
            category.addArticle(article);
            categoryService.replace(category);
            return new ResponseEntity<Category>(category, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
        }

    }
}
