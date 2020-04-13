package ggauthserver.payload;

import javax.validation.constraints.NotBlank;

public class PincodeRequest {

    @NotBlank
    private String pincode;

    @NotBlank
    private String email;

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getEmail() {
        return email;
    }

    public void setUserId(String email) {
        this.email = email;
    } 
}