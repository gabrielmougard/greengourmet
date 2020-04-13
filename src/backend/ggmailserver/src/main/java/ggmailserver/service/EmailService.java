package ggmailserver.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import ggmailserver.model.ConfirmationMail;

@Service
public class EmailService {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private final String FROM = "greengourmetdev@gmail.com"; 

	@Autowired
	private JavaMailSender emailSender;
	
	@Autowired
    private Configuration freemarkerConfig;

	
	public void sendConfirmationMail(ConfirmationMail userMail) throws MessagingException, IOException, TemplateException {
		MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());
        
        freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/templates/");
        Template t = freemarkerConfig.getTemplate("sendConfirmation.ftl");
        
        String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, userMail.getModel());
        helper.setTo(userMail.getTo());
        helper.setText(html, true);
        helper.setSubject(userMail.getSubject());
        helper.setFrom(FROM);
        helper.addInline("logo.PNG", new ClassPathResource("./static/img/logo.png"));
        
        emailSender.send(message);
	}

}
