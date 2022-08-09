package com.kgisl.ws.service;

import java.util.List;

import com.kgisl.ws.entity.WorkLog;

public interface WorkLogService {
    public List<WorkLog> getWorkLogs();
    public WorkLog findByWorkLogId(Long id);
    public WorkLog createWorkLog(WorkLog workLog);
    public WorkLog updateWorkLog(Long id,WorkLog workLog);
    public void deleteWorkLogById(Long id);  
}
