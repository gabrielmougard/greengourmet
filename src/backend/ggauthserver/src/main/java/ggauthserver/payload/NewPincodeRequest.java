package ggauthserver.payload;

import javax.validation.constraints.NotBlank;

public class NewPincodeRequest {
    @NotBlank
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}