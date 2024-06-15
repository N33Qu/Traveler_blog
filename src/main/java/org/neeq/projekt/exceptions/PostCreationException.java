package org.neeq.projekt.exceptions;

public class PostCreationException extends Exception {
    public PostCreationException(String message) {
        super(message);
    }

    public PostCreationException(String message, Throwable cause) {
        super(message, cause);
    }
}