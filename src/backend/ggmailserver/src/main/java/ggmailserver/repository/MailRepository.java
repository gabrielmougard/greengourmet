package ggmailserver.repository;

import ggmailserver.model.ConfirmationMail;

public interface MailRepository {
	public void sendConfirmationMail(ConfirmationMail userMail);
}
