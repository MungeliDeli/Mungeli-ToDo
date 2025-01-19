package com.mungeli.to_do.controller;

import com.mungeli.to_do.model.Task;
import com.mungeli.to_do.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
public class HomeController {


    private static final Logger log = LoggerFactory.getLogger(HomeController.class);
    @Autowired
    TaskService taskService;




    @GetMapping
    public ResponseEntity<List<Task>> getTasks(){
        List<Task> tasks =  taskService.getTaskList();
        return ResponseEntity.ok(tasks);
    }



    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody Task task){
        taskService.addTask(task);
        return ResponseEntity.ok(task);
    }


    @PutMapping
    public ResponseEntity<Task> updateTask(@RequestBody Task task){

        System.out.println(task.toString());

      Task updatedTask = taskService.updateTask(task);

      return updatedTask != null
              ? ResponseEntity.ok(task)
              :ResponseEntity.notFound().build();

    }


    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable String taskId){
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }
}
