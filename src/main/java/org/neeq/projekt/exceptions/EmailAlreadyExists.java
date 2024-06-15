package org.neeq.projekt.exceptions;

public class EmailAlreadyExists extends Exception {
    public EmailAlreadyExists(String message) {
        super(message);
    }

    public EmailAlreadyExists(String message, Throwable cause) {
        super(message, cause);
    }
}
