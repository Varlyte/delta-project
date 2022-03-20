package com.esiea.fr.backendfullstackprojet.repository;

import com.esiea.fr.backendfullstackprojet.model.Article;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends CrudRepository<Article, Long> {

    public Optional<Article> findByName(String name);
}
