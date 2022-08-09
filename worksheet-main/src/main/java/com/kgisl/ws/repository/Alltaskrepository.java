package com.kgisl.ws.repository;

import com.kgisl.ws.entity.AllTask;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface Alltaskrepository extends JpaRepository<AllTask,Long> {
    AllTask findByTaskname(String taskname); 
}
