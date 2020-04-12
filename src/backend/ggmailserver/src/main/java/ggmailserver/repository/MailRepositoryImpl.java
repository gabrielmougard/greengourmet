package ggmailserver.repository;

import java.io.IOException;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import freemarker.template.TemplateException;
import ggmailserver.model.ConfirmationMail;
import ggmailserver.service.EmailService;

@Repository
public class MailRepositoryImpl implements MailRepository {
	
	@Autowired
	private EmailService emailService;
	
	@Override
	public void sendConfirmationMail(ConfirmationMail userMail) {
		try {
			emailService.sendConfirmationMail(userMail);
		} catch (MessagingException | IOException | TemplateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
