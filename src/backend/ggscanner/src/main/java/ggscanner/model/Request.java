package ggscanner.model;

//import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.validation.constraints.NotBlank;
//import javax.persistence.*;
//import javax.validation.constraints.Email;
//import javax.validation.constraints.NotNull;

/*@Entity
@Table(name = "item", uniqueConstraints = {
})*/
public class Request {
	
	@NotBlank
	private String userId;
	
	@NotBlank
	private String barcode;
	
    public String getUserId() {
		return this.userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
    }
    public String getBarcode() {
		return barcode;
	}
	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}
}