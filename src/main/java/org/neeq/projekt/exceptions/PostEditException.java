package org.neeq.projekt.exceptions;

public class PostEditException extends Exception {
    public PostEditException(String message) {
        super(message);
    }

    public PostEditException(String message, Throwable cause) {
        super(message, cause);
    }


}