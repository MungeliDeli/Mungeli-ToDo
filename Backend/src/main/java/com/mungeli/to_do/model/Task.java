package com.mungeli.to_do.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "todoTask")
public class Task {

    @Id
    private String _id;
    private String name;
    private boolean done = false;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public boolean getDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    @Override
    public String toString(){
        String messege = "";

        messege = "name: " + name + "\n id: " + _id + "\n done: " + done;

        return messege;
    }
}

