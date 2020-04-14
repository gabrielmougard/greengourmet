package ggauthserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import ggauthserver.model.User;
import ggauthserver.repository.UserRepository;
import net.minidev.json.JSONObject;

import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ConfirmationService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final String EMAIL_SERVICE_API_URL = "http://mailserverdev:8083/mail";
    private final String EMAIL_CONFIRMATION_SUBJECT = "GreenGourmet : confirmation email";
    private RestTemplate apiClient = new RestTemplate();

    @Autowired
    private BCryptPasswordEncoder pincodeEncoder;

    @Autowired
    private UserRepository userRepository;

    public User initiateConfirmation(User user) {

        //generate pincode
        String pincode = String.format("%06d", new Random().nextInt((999999-100000)+1)+100000); //random 6 digits pincode
        user.setPincodeEmail(pincodeEncoder.encode(pincode));
        callConfirmationEmailAPI(user, pincode);
        return user;
    }

    public void updatePincode(User user) {
        //generate new pincode
        String pincode = String.format("%06d", new Random().nextInt((999999-100000)+1)+100000); //random 6 digits pincode 
        //update in DB
        userRepository.setPincodeEmailById(pincodeEncoder.encode(pincode), user.getId());
        callConfirmationEmailAPI(user, pincode);
    }

    private void callConfirmationEmailAPI(User user, String pincode) {
        String confirmationRoute = EMAIL_SERVICE_API_URL + "/sendconfirmation";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        JSONObject confirmationMailObject = new JSONObject();
        confirmationMailObject.put("to", user.getEmail());
        confirmationMailObject.put("subject", EMAIL_CONFIRMATION_SUBJECT);
        confirmationMailObject.put("pincode", pincode);

        HttpEntity<String> entity = new HttpEntity<String>(confirmationMailObject.toString(), headers);
        ResponseEntity<String> confirmationEmailResponse = apiClient
            .exchange(confirmationRoute, HttpMethod.POST, entity, String.class);
        if (confirmationEmailResponse.getStatusCode() == HttpStatus.OK) {
            logger.info("email sent sucessfully !");
        } else {
            logger.info("error while sending email !");
        }
    }
}