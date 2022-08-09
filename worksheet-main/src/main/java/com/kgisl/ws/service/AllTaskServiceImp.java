package com.kgisl.ws.service;

import java.util.List;

import com.kgisl.ws.entity.AllTask;
import com.kgisl.ws.repository.Alltaskrepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AllTaskServiceImp implements AllTaskService {

    @Autowired
    public Alltaskrepository alltaskrepository;

    @Override
    public List<AllTask> getAllTasks() {
        return alltaskrepository.findAll();

    }

    @Override
    public AllTask findByAllTaskId(Long id) {
        alltaskrepository.findById(id);
        return alltaskrepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
    }

    @Override
    public AllTask createAllTask(AllTask alltask) {
        return alltaskrepository.save(alltask);
    }

    @Override
    public AllTask updateAllTask(Long id, AllTask alltask) {

        return alltaskrepository.findById(id)
                .map(s -> {
                    s.setTaskname(alltask.getTaskname());
                    s.setDescription(alltask.getDescription());
                    s.setAssigneto(alltask.getAssigneto());
                    s.setAssignedate(alltask.getAssignedate());
                    s.setDuedate(alltask.getDuedate());
                    return alltaskrepository.save(s);
                })
                .orElseGet(() -> {
                    return alltaskrepository.save(alltask);
                });
    }
    // AllTask s = alltaskrepository.getById(id);
    // s.setTaskname(alltask.getTaskname());
    // s.setDescription(alltask.getDescription());
    // s.setAssigneto(alltask.getAssigneto());
    // s.setAssignedate(alltask.getAssignedate());

    // alltaskrepository.save(alltask);
    // return alltaskrepository.save(alltask);
    // }

    @Override
    public void deleteAllTaskById(Long id) {
        alltaskrepository.deleteById(id);

    }

}