import { SimpleGrid, Box, Text, Button, Center, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../api/index";
import DarkMode from "./DarkMode";


const Item = () => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const getAllItems = async () => {
        await API.getItems()
            .then(response => {
                console.log(response.data);
                setItems(response.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDelete = (id) => {
        API.deleteItem(id)
            .then((res) => {
                getAllItems();
            })
    }

    // const handleAddItem = (newItem) => {
    //     API.createNewItem({
    //         name: newItem.name,
    //         quantity: newItem.quantity,
    //         price: newItem.price
    //     })
    //     .then((res) => {
    //         getAllItems();
    //     })
    //     .catch((err => {
    //         console.log(err);
    //     }))
    // }

    useEffect(() => {
        getAllItems();
    }, [isLoading]);

    return (
        <div>
            <DarkMode />
            <Center>
                <Heading
                >Grocery List</Heading>
            </Center>
            <Center>
            <Button
                    margin={2}
                    colorScheme="cyan"
                    variant="outline"
                    onClick={() => history.push("/newItem")}
                >Add Item</Button>
            </Center>

            <SimpleGrid
                columns={{ sm: 1, md: 3 }}
                margin={5}
                padding={5}
                spacingX="40px" spacingY="20px"
            >
                {items ? (
                    items.map(item => (
                        <Box
                            boxShadow="dark-lg"
                            rounded="md"
                            boxSize="100%"
                            height={150}
                            width={80}
                            padding={5}
                            key={item.id}>

                            <Text>
                                {item.name}
                            </Text>
                            <Text>{item.quantity}</Text>
                            <Text>{item.price}</Text>
                            <Center>
                                <Button
                                    margin={2}
                                    colorScheme="cyan"
                                    variant="outline"
                                    onClick={() => history.push({
                                        pathname: "/updateItem",
                                        state: {id: item.id}
                                    })}
                                >Update</Button><span><Button
                                    margin={2}
                                    colorScheme="cyan"
                                    variant="outline"
                                    onClick={() => handleDelete(item.id)}
                                >Delete</Button></span>
                            </Center>
                        </Box>
                    ))
                ) : (
                    <div>Loading</div>
                )}

            </SimpleGrid>
        </div>
    )

}

export default Item;