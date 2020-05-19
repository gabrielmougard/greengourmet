package ggarticleserver.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import ggarticleserver.repository.ArticleRepository;
import ggarticleserver.model.ApiResponse;
import ggarticleserver.model.Article;
import ggarticleserver.model.ArticlesWrapper;

@RestController
@RequestMapping("/article")
public final class ArticleController {
	
	@Autowired
	private ArticleRepository articleRepository;
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	ApiResponse create(@RequestBody @Valid ArticlesWrapper articleEntries) {
		logger.info(articleEntries.getArticles().toString());
		int res = articleRepository.insert(articleEntries.getArticles());
		if (res != 0) {
			return new ApiResponse(true, "Fridge updated.");
		} else {
			return new ApiResponse(false, "Internal error.");
		}
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	void deleteById(@PathVariable("id") String id) {
		articleRepository.deleteById(id);
	}
	
	@RequestMapping(value = "/user/{userid}", method = RequestMethod.GET)
	List<Article> findByUserId(@PathVariable("userid") String userId) {
		return articleRepository.findByUserId(userId);
	}
	
	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	Article updateById(@PathVariable("id") String id, @RequestBody @Valid Article articleEntry) {
		return articleRepository.updateById(id, articleEntry);
	}
	
	@ExceptionHandler()
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public void handleUserNotFound(Exception ex) {

		logger.info("General Error!");
		ex.printStackTrace();

	}
	
}
