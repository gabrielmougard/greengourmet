package ggrecipessearch.controller;

import com.google.api.translate.Language; 
import com.google.api.translate.Translate;

import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TranslationController {

    @Value("${translation.googleAPI.key}")
    private String googleAPIKey;
    @Value("${translation.googleAPI.httpReferrer}")
    private String googleAPIHttpReferrer;

    public Map<String, String> englishToFrench(String[] args) throws Exception { 
        // Set the HTTP referrer to your website address. 
        //GoogleAPI.setHttpReferrer(googleAPIHttpReferrer);

        // Set the Google Translate API key
        // See: http://code.google.com/apis/language/translate/v2/getting_started.html
        //GoogleAPI.setKey(googleAPIKey);
        Map<String, String> map = new HashMap<>();
        for(String mot : args){
          map.put(mot, Translate.DEFAULT.execute(mot, Language.FRENCH, Language.ENGLISH));
        }
        return map;
    } 
    public void setGoogleAPIKey(String googleAPIKey){
        this.googleAPIKey = googleAPIKey;
    }
    public void setGoogleAPIHttpReferrer(String googleAPIHttpReferrer){
        this.googleAPIHttpReferrer=googleAPIHttpReferrer;
    }
}

/*import java.io.BufferedReader;
import java.io.OutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Translator {
  // TODO: If you have your own Premium account credentials, put them down here:
  private static final String CLIENT_ID = "FREE_TRIAL_ACCOUNT";
  private static final String CLIENT_SECRET = "PUBLIC_SECRET";
  private static final String ENDPOINT = "http://api.whatsmate.net/v1/translation/translate";

  public static void main(String[] args) throws Exception {
    // TODO: Specify your translation requirements here:
    String fromLang = "en";
    String toLang = "es";
    String text = "Let's have some fun!";

    Translator.translate(fromLang, toLang, text);
  }


  public static void translate(String fromLang, String toLang, String text) throws Exception {
    // TODO: Should have used a 3rd party library to make a JSON string from an object
    String jsonPayload = new StringBuilder()
      .append("{")
      .append("\"fromLang\":\"")
      .append(fromLang)
      .append("\",")
      .append("\"toLang\":\"")
      .append(toLang)
      .append("\",")
      .append("\"text\":\"")
      .append(text)
      .append("\"")
      .append("}")
      .toString();

    URL url = new URL(ENDPOINT);
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    conn.setDoOutput(true);
    conn.setRequestMethod("POST");
    conn.setRequestProperty("X-WM-CLIENT-ID", CLIENT_ID);
    conn.setRequestProperty("X-WM-CLIENT-SECRET", CLIENT_SECRET);
    conn.setRequestProperty("Content-Type", "application/json");

    OutputStream os = conn.getOutputStream();
    os.write(jsonPayload.getBytes());
    os.flush();
    os.close();

    int statusCode = conn.getResponseCode();
    System.out.println("Status Code: " + statusCode);
    BufferedReader br = new BufferedReader(new InputStreamReader(
        (statusCode == 200) ? conn.getInputStream() : conn.getErrorStream()
      ));
    String output;
    while ((output = br.readLine()) != null) {
        System.out.println(output);
    }
    conn.disconnect();
  }

}*/