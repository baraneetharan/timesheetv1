package com.kgisl.ws.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class AllTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;
    public String taskname;
    public String description;
    public String assigneto;
    public String assignedate;    
    public String duedate;
    public String status="NotStarted";
    
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getTaskname() {
        return taskname;
    }
    public void setTaskname(String taskname) {
        this.taskname = taskname;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getAssigneto() {
        return assigneto;
    }
    public void setAssigneto(String assigneto) {
        this.assigneto = assigneto;
    }
    public String getAssignedate() {
        return assignedate;
    }
    public void setAssignedate(String assignedate) {
        this.assignedate = assignedate;
    }
    public String getDuedate() {
        return duedate;
    }
    public void setDuedate(String duedate) {
        this.duedate = duedate;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    
}
