package com.kgisl.ws.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.kgisl.ws.entity.AllTask;
import com.kgisl.ws.service.AllTaskService;

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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@EnableAspectJAutoProxy(proxyTargetClass = true)
@RestController
@RequestMapping("/api/alltasks")
public class AllTaskController {
    
    @Autowired
    public AllTaskService allTaskService;

    @RequestMapping(value="/animals", method=RequestMethod.GET)
@ResponseBody
public Map<String, Map<String, Long>> showAllAnimals() {
    Map<String, Map<String, Long>> x = allTaskService.getAllTasks().stream()
    .collect(Collectors.groupingBy(AllTask::getAssigneto,
        Collectors.groupingBy(AllTask::getStatus,Collectors.counting())));

        // x.forEach(System.out::println);

        x.forEach((K,V) -> System.out.println(K + " : " + V));
        // new JSONObject(x);
    return x;
}

    @GetMapping("/")
    public @ResponseBody ResponseEntity<List<AllTask>> getAll() {        
        return new ResponseEntity<>(allTaskService.getAllTasks(), HttpStatus.OK);
    }
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<AllTask> getTeamById(@PathVariable("id") long id) {
    AllTask alltask = allTaskService.findByAllTaskId(id);
       if (alltask == null) {
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
       return new ResponseEntity<>(alltask, HttpStatus.OK);
   }

    @PostMapping(value = "/", headers = "Accept=application/json")
   public ResponseEntity<AllTask> createTeam(@RequestBody AllTask alltask) {
    AllTask actualAllTask=allTaskService.createAllTask(alltask);
       HttpHeaders headers = new HttpHeaders();
       // headers.setLocation(ucBuilder.path("/{id}").buildAndExpand(team.getTeamid()).toUri());
       return new ResponseEntity<>(actualAllTask,headers, HttpStatus.CREATED);
   }

//    @PutMapping(value = "/{id}", headers="Accept=application/json")
//    public ResponseEntity<AllTask> updateAllTask(@PathVariable("id") long id,@RequestBody AllTask currentAllTask)
//    {
//     AllTask alltask=allTaskService.updateAllTask(id,currentAllTask);
//        return new ResponseEntity<>(alltask,HttpStatus.OK);
//    }

   @PutMapping("/{id}")
   ResponseEntity<AllTask> updateAllTask(@RequestBody AllTask allTask, @PathVariable Long id) {

    AllTask curralltask = allTaskService.updateAllTask(id,allTask);
        return new ResponseEntity<>(curralltask,HttpStatus.OK);

            // .map(address -> {
            //     address.setCity(newAddress.getCity());
            //     address.setPin(newAddress.getPostalCode());
            //     return repository.save(address);
            // })
            // .orElseGet(() -> {
            //     return repository.save(newAddress);
            // });
    }

   @DeleteMapping(value="/{id}", headers ="Accept=application/json")
   public ResponseEntity<AllTask> deleteAllTask(@PathVariable("id") Long id){
    AllTask alltask = allTaskService.findByAllTaskId(id);
       if (alltask == null) {
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
       allTaskService.deleteAllTaskById(id);
       return new ResponseEntity<>(HttpStatus.NO_CONTENT);
   }
}
