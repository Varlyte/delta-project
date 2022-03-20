package com.esiea.fr.backendfullstackprojet.controller;

import com.esiea.fr.backendfullstackprojet.model.Article;
import com.esiea.fr.backendfullstackprojet.service.ArticleService;
import com.esiea.fr.backendfullstackprojet.service.NotAllowedException;
import com.esiea.fr.backendfullstackprojet.service.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.function.Predicate;

@CrossOrigin()
@RestController
@RequestMapping("/api/private/articles")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @GetMapping("")
    public Iterable <Article> getArticles(){
        return articleService.getArticles();
    }

    public static Predicate<Article> isID(long id)
    {
        return a -> a.getId() == id;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getProduct(@PathVariable("id") Long id) {
        try {
            Article a =  articleService.getArticle(id);
            return new  ResponseEntity<Article>(a, HttpStatus.OK);
        }
        catch (NotFoundException e){
            return new  ResponseEntity<Article>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/author_name/{name}")
    public ResponseEntity<Article> getArticleByAuthorName(@PathVariable("name") String name){
        try {
            Article a = articleService.GetbyAuthorName(name);
            return new ResponseEntity<Article>(a ,HttpStatus.OK);
        }catch(NotFoundException e) {
            return new ResponseEntity<Article>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<Article> createProduct(@RequestBody Article article) {
        try {
            Article a =  articleService.Create(article);
            return new ResponseEntity<>(a, HttpStatus.OK);
        } catch (NotAllowedException e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable("id") Long id) throws NotFoundException
    {
        try {
            articleService.Delete(id);
            return new  ResponseEntity<>(HttpStatus.OK);
        } catch (NotFoundException e) {
            return new  ResponseEntity<>( HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping("")
    public ResponseEntity<Article> replaceArticle(@RequestBody Article article) {
        try {
            Article a = articleService.Update(article);
            return new ResponseEntity<>(a, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("")
    public ResponseEntity<Article> partielReplaceArticle(@RequestBody Article article){
        try {
            Article existingArticle = articleService.getArticle(article.getId());
            if(article.getAuthor_name() != null && !article.getAuthor_name().equals(existingArticle.getAuthor_name()))
                existingArticle.setAuthor_name(article.getAuthor_name());
            if(article.getContenu() != null && !article.getContenu().equals(existingArticle.getContenu()))
                existingArticle.setContenu(article.getContenu());
            return new ResponseEntity<>(existingArticle, HttpStatus.OK);
        }catch (NotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

}
