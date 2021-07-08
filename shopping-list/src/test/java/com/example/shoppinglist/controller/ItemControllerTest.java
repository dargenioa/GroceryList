package com.example.shoppinglist.controller;

import com.example.shoppinglist.dto.Item;
import com.example.shoppinglist.repository.ItemRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@WebMvcTest(ItemController.class)
public class ItemControllerTest {

    @Autowired
    //injecting the MockMvc class
    private MockMvc mockMvc;

    @MockBean
    // injecting the repository/interface
    private ItemRepository itemRepository;

    private ObjectMapper mapper = new ObjectMapper();

    private Item input;
    private Item input2;
    private String inputJson;
    private String input2Json;
    private Item output;
    private String outputJson;
    private List<Item> shoppingList = new ArrayList<>();
    private String shoppingListJson;

    @Before
    public void setUp() throws JsonProcessingException {
        input = new Item(10, "Bananas", 14, 4.99);
        inputJson = mapper.writeValueAsString(input);

        output = new Item(10, "Bananas", 14, 4.99);
        outputJson = mapper.writeValueAsString(output);

        input2 = new Item(11, "Apples", 5, 5.99);
        input2Json = mapper.writeValueAsString(input2);

        shoppingList.add(input);
        shoppingList.add(input2);
        shoppingListJson = mapper.writeValueAsString(shoppingList);
    }

    @Test
    public void shouldCreateNewItemStatusIsCreated() throws Exception {

        given(itemRepository.save(input)).willReturn(output);

        mockMvc.perform(post("/list")
                .content(inputJson)
                .contentType(MediaType.APPLICATION_JSON)
        )
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(content().json(outputJson));

    }

    @Test
    public void shouldReturnItemByIdAndReturnStatusOk() throws Exception {

        given(itemRepository.getById(10)).willReturn(input);

        mockMvc.perform(
                get("/list/10"))
                .andExpect(status().isOk())
                .andExpect((content().json(inputJson))
                );

    }

    @Test
    public void shouldReturnShoppingListWithStatusIsOk() throws Exception {

        given(itemRepository.findAll()).willReturn(shoppingList);

        mockMvc.perform(get("/list"))
                .andExpect(status().isOk())
                .andExpect((content().json(shoppingListJson))
                );
    }

    @Test
    public void shouldUpdateByIdAndReturnStatusNoContent() throws Exception {
        //we don't return on a post or a delete, so we won't need the given and will do

        input2.setName("Carrots");
        input2.setQuantity(5);
        input2.setPrice(1.99);


        mockMvc.perform(put("/list/11")
                .content(input2Json)
                .contentType(MediaType.APPLICATION_JSON)
        )
                .andDo(print())
                .andExpect(status().isNoContent());

    }


    @Test
    public void shouldDeleteItemByIdAndReturnStatusNoContent() throws Exception {

        mockMvc.perform(delete("/list/11")
        )
                .andDo(print())
                .andExpect(status().isNoContent());

    }

}

