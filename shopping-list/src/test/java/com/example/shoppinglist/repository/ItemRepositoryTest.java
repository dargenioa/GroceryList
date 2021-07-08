package com.example.shoppinglist.repository;

import com.example.shoppinglist.dto.Item;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ItemRepositoryTest {

    @Autowired
    ItemRepository itemRepository;


    @Before
    public void setUp() throws Exception {

        List<Item> shoppingList = itemRepository.findAll();

        shoppingList.stream()
                .forEach(item -> itemRepository.deleteById(item.getId()));

    }

    @Test
    public void getAndDeleteById() {
        Item item = new Item();
        item.setPrice(12.99);
        item.setQuantity(10);
        item.setName("Coffee");
        itemRepository.save(item);

        Item fromRepo = itemRepository.getById(item.getId());

        assertEquals(fromRepo,item);

        itemRepository.deleteById(item.getId());
        fromRepo = itemRepository.getById(item.getId());

        assertNull(fromRepo);
    }
}