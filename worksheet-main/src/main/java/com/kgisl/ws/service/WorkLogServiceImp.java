package com.kgisl.ws.service;

import java.util.List;

import com.kgisl.ws.entity.WorkLog;
import com.kgisl.ws.repository.WorkLogRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class WorkLogServiceImp implements WorkLogService {

    @Autowired
    public WorkLogRepository workLogRepository;
    

    @Override
    public List<WorkLog> getWorkLogs() {
        return workLogRepository.findAll();

    }

    @Override
    public WorkLog findByWorkLogId(Long id) {
        workLogRepository.findById(id);
        return workLogRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
    }

    @Override
    public WorkLog createWorkLog(WorkLog worklog) {
        return workLogRepository.save(worklog);
    }

    @Override
    public WorkLog updateWorkLog(Long id, WorkLog worklog) {

        return workLogRepository.findById(id)
                .map(s -> {
                    // s.setTaskname(alltask.getTaskname());
                    s.setEmpname(worklog.getEmpname());
                    s.setTaskname(worklog.getTaskname());
                    s.setDate(worklog.getDate());
                    s.setStime(worklog.getStime());
                    s.setEtime(worklog.getEtime());
                    s.setStatus(worklog.getStatus());
                    return workLogRepository.save(s);

                })
                .orElseGet(() -> {
                    return workLogRepository.save(worklog);
                });
    }
    // WorkLog s = worklogrepository.getById(id);
    // s.setTaskname(worklog.getTaskname());
    // s.setDescription(worklog.getDescription());
    // s.setAssigneto(worklog.getAssigneto());
    // s.setAssignedate(worklog.getAssignedate());

    // worklogrepository.save(worklog);
    // return worklogrepository.save(worklog);
    // }

    @Override
    public void deleteWorkLogById(Long id) {
        workLogRepository.deleteById(id);

    }

}