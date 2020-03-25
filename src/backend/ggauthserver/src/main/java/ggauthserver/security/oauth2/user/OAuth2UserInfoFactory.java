package ggauthserver.security.oauth2.user;

import ggauthserver.exception.OAuth2AuthenticationProcessingException;
import ggauthserver.model.AuthProvider;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
        /*
        in the future, we could add more OAuth2 provider here like Facebook, Twitter, etc...
        */
    }
}