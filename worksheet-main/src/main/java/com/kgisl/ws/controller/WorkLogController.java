package com.kgisl.ws.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.kgisl.ws.entity.AllTask;
import com.kgisl.ws.entity.WorkLog;
import com.kgisl.ws.repository.Alltaskrepository;
import com.kgisl.ws.service.WorkLogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@EnableAspectJAutoProxy(proxyTargetClass = true)
@RestController
@RequestMapping("/api/worklogs")
public class WorkLogController {

    @Autowired
    public WorkLogService workLogService;
    @Autowired
    public Alltaskrepository alltaskrepository;

    @GetMapping("/")
    public @ResponseBody ResponseEntity<List<WorkLog>> getAll() {
        // System.out.println(Arrays.toString(workLogService.getWorkLogs()));        
        return new ResponseEntity<>(workLogService.getWorkLogs(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WorkLog> getTeamById(@PathVariable("id") long id) {
        WorkLog worklog = workLogService.findByWorkLogId(id);
        if (worklog == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(worklog, HttpStatus.OK);
    }

    // @GetMapping(value = "/gettaskname")
    public void getTaskName(String taskname, String status) {
        System.out.println("WorkLogController "+taskname+" , "+status);
        AllTask mytask = alltaskrepository.findByTaskname(taskname);
        // Optional<AllTask> mytask = alltasks.stream().filter(t -> t.taskname.equals(taskname)).findFirst();
        // // mytask.ifPresent(s -> s.status);
        // AllTask tsk = mytask.get();
        mytask.setStatus(status);
        alltaskrepository.save(mytask);
        // public @ResponseBody ResponseEntity<List<WorkLog>> getTaskName() {
        // return new ResponseEntity<>(workLogService.getWorkLogs(), HttpStatus.OK);
    }

    @PostMapping(value = "/", headers = "Accept=application/json")
    public ResponseEntity<WorkLog> createTeam(@RequestBody WorkLog workLog) {
        getTaskName(workLog.taskname,workLog.status);
        WorkLog actualWorkLog = workLogService.createWorkLog(workLog);
        HttpHeaders headers = new HttpHeaders();
        // headers.setLocation(ucBuilder.path("/{id}").buildAndExpand(team.getTeamid()).toUri());
        return new ResponseEntity<>(actualWorkLog, headers, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    ResponseEntity<WorkLog> updateWorkLog(@RequestBody WorkLog workLog, @PathVariable Long id) {
        System.out.println("workLog.status " + workLog.status);
        getTaskName(workLog.taskname,workLog.status);
        WorkLog currworklog = workLogService.updateWorkLog(id, workLog);
        return new ResponseEntity<>(currworklog, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}", headers = "Accept=application/json")
    public ResponseEntity<WorkLog> deleteWorkLog(@PathVariable("id") Long id) {
        WorkLog worklog = workLogService.findByWorkLogId(id);
        if (worklog == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        workLogService.deleteWorkLogById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
