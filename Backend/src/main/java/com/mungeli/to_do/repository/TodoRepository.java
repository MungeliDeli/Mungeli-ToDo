package com.mungeli.to_do.repository;

import com.mungeli.to_do.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoRepository extends MongoRepository<Task , String> {
}
