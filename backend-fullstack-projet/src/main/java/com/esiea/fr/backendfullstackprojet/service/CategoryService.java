package com.esiea.fr.backendfullstackprojet.service;
import java.util.Optional;

import com.esiea.fr.backendfullstackprojet.model.Category;
import com.esiea.fr.backendfullstackprojet.repository.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
@Service
public class CategoryService {
    Logger logger = LoggerFactory.getLogger(ArticleService.class);

    @Autowired
    private CategoryRepository categoryRepository;

    public Iterable<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategorie(long id) throws NotFoundException {
        Optional<Category> category = categoryRepository.findById(id);
        if(category.isPresent())
            return category.get();
        throw new NotFoundException();
    }

    public Category create(Category category) throws NotAllowedException {
        if(category.getId() == null)
            return categoryRepository.save(category);
        throw new NotAllowedException();
    }

    public void delete(Long id) throws NotFoundException {
        try {
            categoryRepository.deleteById(id);
        }catch (EmptyResultDataAccessException e) {
            throw new NotFoundException();
        }
    }

    public Category replace(Category category) throws NotFoundException {
        try {
            getCategorie(category.getId());
            return categoryRepository.save(category);
        } catch (NotFoundException e) {
            throw new NotFoundException();
        }


    }
}
