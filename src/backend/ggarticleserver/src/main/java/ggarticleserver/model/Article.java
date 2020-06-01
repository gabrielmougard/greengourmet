package ggarticleserver.model;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;


@Document(collection = "Article")
@JsonSerialize
public class Article implements Serializable {
	private static final long serialVersionUID = 576747585L;

	@Id
	private String articleId;
	
	@NotNull
	private String userId;
	
	@NotNull
	private String name;

	@NotNull
	private String ingredients;
	
	@NotNull
	private String quantity;
	
	@NotNull
	private String quantityUnit;
	
	@NotNull
	private String expiringDate;
	
	@NotNull
	private String barcode;
	
	// hashKey in Redis
	private String redisUUID;
	
	public String getArticleId() {
		return this.articleId;
	}
	
	public void setArticleId(String articleId) {
		this.articleId = articleId;
	}
	
	public String getUserId() {
		return this.userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public String getIngredients() {
		return this.ingredients;
	}
	
	public void setIngredients(String ingredients) {
		this.ingredients = ingredients;
	}
	
	public String getQuantity() {
		return this.quantity;
	}
	
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	
	public String getQuantityUnit() {
		return this.quantityUnit;
	}
	
	public void setQuantityUnit(String quantityUnit) {
		this.quantityUnit = quantityUnit;
	}
	
	public String getExpiringDate() {
		return this.expiringDate;
	}
	
	public void setExpiringDate(String expiringDate) {
		this.expiringDate = expiringDate;
	}
	
	public String getBarcode() {
		return this.barcode;
	}
	
	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}
	
	public String getRedisUUID() {
		return this.redisUUID;
	}
	
	public void setRedisUUID(String redisUUID) {
		this.redisUUID = redisUUID;
	}
 	
	@Override
	public String toString() {
		return "ARTICLE_ID : "+this.articleId +"\nUSER_ID : "+this.userId+
				"\nNAME : "+this.name+"\nINGREDIENTS : "+this.ingredients+"\nQUANTITY : "+this.quantity+
				"\nQUANTITY_UNIT : "+this.quantityUnit+"\nEXPIRING_DATE : "+this.expiringDate+
				"\nBARCODE : "+this.barcode+"\nREDIS_UUID : "+this.redisUUID+"\n";
	}
	
}


