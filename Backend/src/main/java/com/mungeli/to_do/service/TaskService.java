package com.mungeli.to_do.service;

import com.mungeli.to_do.model.Task;
import com.mungeli.to_do.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {


    @Autowired
    TodoRepository todoRepository;

    public List<Task> getTaskList(){
       return todoRepository.findAll();
    }
    
    public void addTask(Task task){
        todoRepository.insert(task);
    }

    public Task updateTask(Task task){
        Optional<Task> existingTask = todoRepository.findById(task.get_id());
        if (existingTask.isPresent()) {
            return todoRepository.save(task);
        }

        return null;

    }

    public void deleteTask(String id){
        todoRepository.deleteById(id);
    }

}


