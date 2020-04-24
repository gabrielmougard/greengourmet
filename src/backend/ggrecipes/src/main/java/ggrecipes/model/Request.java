package ggrecipes.model;

//import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
//import javax.persistence.*;
//import javax.validation.constraints.Email;
//import javax.validation.constraints.NotNull;

/*@Entity
@Table(name = "item", uniqueConstraints = {
})*/
public class Request {

    private String userId;
	private String barcode;
	
	@JsonCreator
    public Request(@JsonProperty("userId") String userId, @JsonProperty("barcode") String barcode) {
        this.userId = userId;
        this.barcode = barcode;
    }
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