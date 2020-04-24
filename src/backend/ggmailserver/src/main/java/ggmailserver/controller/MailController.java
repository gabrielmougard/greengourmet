package ggmailserver.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ggmailserver.model.ConfirmationMail;
import ggmailserver.repository.MailRepository;

@RestController
@RequestMapping("/mail")
public class MailController {
	
	@Autowired
	private MailRepository mailRepository;
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@RequestMapping(value = "/sendconfirmation", method = RequestMethod.POST)
	void sendConfirmationMail(@RequestBody @Valid ConfirmationMail userMail) {
		logger.info(userMail.toString());
		mailRepository.sendConfirmationMail(userMail);
		System.out.println("hello");
	}
}
