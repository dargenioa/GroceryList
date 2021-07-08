package com.example.shoppinglist.controller;

import com.example.shoppinglist.dto.Item;
import com.example.shoppinglist.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ItemController {

    @Autowired
    ItemRepository itemRepository;

    @PostMapping(value = "/list")
    @ResponseStatus(value = HttpStatus.CREATED)
    public Item createItem(@RequestBody Item item) {

        Item newItem = itemRepository.save(item);
        return newItem;
    }

    @GetMapping(value = "/list")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Item> getAllItems() {

        return itemRepository.findAll();
    }

    @GetMapping(value = "/list/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Item getItemById(@PathVariable int id) {
        return itemRepository.getById(id);
    }

    @PutMapping(value = "/list/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void updateItem(@PathVariable int id, @RequestBody Item item) {

        if (item.getId() == id) {
            itemRepository.save(item);
        } else if (item.getId() != id) {
            throw new IllegalArgumentException();
        }
    }

    @DeleteMapping(value = "/list/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteItem(@PathVariable int id) {

        itemRepository.deleteById(id);

    }





}
