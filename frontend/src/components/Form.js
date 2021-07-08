import {
    Button,
    Container,
    DarkMode,
    FormControl,
    FormLabel,
    HStack,
    Input,
    VisuallyHidden,
    VStack,
} from '@chakra-ui/react';
import API from "../api/index";
import { useHistory } from 'react-router-dom';


function Form() {

    const history = useHistory();

   const handleAddItem = (newItem) => {
        API.createNewItem(newItem)
            .then((res) => {
                console.log(res);
            })
            .catch((err => {
                console.log(err);
            }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddItem(Object.fromEntries(new FormData(event.target)));
        event.target.reset();
        history.push("/");
    }

    return (
        <Container mt={2}>
            <form onSubmit={handleSubmit}>
                <VStack spacing="24px">
                    <HStack spacing="24px">
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="Item name" name="name" />
                        </FormControl>

                        <FormControl id="quantity" isRequired>
                            <FormLabel>Quantity</FormLabel>
                            <Input placeholder="quantity" name="quantity" />
                        </FormControl>

                        <FormControl id="price" isRequired>
                            <FormLabel>Price</FormLabel>
                            <Input placeholder="price" name="price" />
                        </FormControl>
                    </HStack>

                    <Button colorScheme="green" size="lg" type="submit">
                        Add New Item
                    </Button>
                </VStack>
            </form>
        </Container>
    );
}

export default Form;