package com.esiea.fr.backendfullstackprojet.service;

import com.esiea.fr.backendfullstackprojet.model.Article;
import com.esiea.fr.backendfullstackprojet.repository.ArticleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ArticleService {

    Logger logger = LoggerFactory.getLogger(ArticleService.class);

    @Autowired
    private ArticleRepository articleRepository;

    public Iterable<Article> getArticles(){
        return articleRepository.findAll();
    }

    public Article getArticle(Long id) throws NotFoundException{
        Optional<Article> res = articleRepository.findById(id);
        if (res.isPresent()){
            return res.get();
        }
        else {
            throw new NotFoundException();
        }
    }

    public Article Create(Article article) throws NotAllowedException{
        if ( article.getId()== null )
            articleRepository.save(article);
        throw new NotAllowedException();
    }

    public Article Update(Article article) throws NotFoundException {
        try {
            getArticle(article.getId());
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
        return articleRepository.save(article);
    }

    public void Delete(Long id) throws NotFoundException{
        try {
            articleRepository.deleteById(id);
        }catch (EmptyResultDataAccessException e){
            logger.warn(id + " not found");
            throw new NotFoundException();
        }
    }
    public Article GetbyAuthorName(String author_name) throws NotFoundException{
        Optional<Article> article = articleRepository.findByName(author_name);
        if (article.isPresent()){
            return article.get();
        }
        throw new NotFoundException();
    }
}
