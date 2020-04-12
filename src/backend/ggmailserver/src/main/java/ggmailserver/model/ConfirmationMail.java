package ggmailserver.model;

import java.util.HashMap;
import java.util.Map;

public class ConfirmationMail {
	
	private String to;
	private int pincode;
	private String subject;
	
	public String getTo() {
		return to;
	}
	
	public void setTo(String to) {
		this.to = to;
	}
	
	public int getPincode() {
		return pincode;
	}
	
	public void setPincode(int pincode) {
		this.pincode = pincode;
	}
	
	public String getSubject() {
		return subject;
	}
	
	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	public Map<String, String> getModel() {
		Map<String, String> model = new HashMap<String, String>();
		model.put("pincode", Integer.toString(this.pincode));
		model.put("to", this.to);
		model.put("subject", this.subject);
		return model;
	}
	
	@Override
	public String toString() {
		return "to : mail :"+this.to+" pincode : "+this.pincode;
	}
}
