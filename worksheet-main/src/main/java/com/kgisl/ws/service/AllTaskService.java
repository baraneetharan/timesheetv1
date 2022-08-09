package com.kgisl.ws.service;

import java.util.List;

import com.kgisl.ws.entity.AllTask;

public interface AllTaskService {
    public List<AllTask> getAllTasks();
    public AllTask findByAllTaskId(Long id);
    public AllTask createAllTask(AllTask team);
    public AllTask updateAllTask(Long id,AllTask team);
    public void deleteAllTaskById(Long id);  
}
