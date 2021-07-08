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
    Select,
    Field,
    Center
} from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import API from "../api/index";


function UpdateForm() {
    const location = useLocation();
    const history = useHistory();


    const handleUpdateItem = (item) => {
        const id = location.state.id;
        API.updateItem(id, item)
            .then((res) => {
                console.log(res);
            })
            .catch((err => {
                console.log(err);
            }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdateItem(Object.fromEntries(new FormData(event.target)));
        event.target.reset();
        history.push("/");
        
    }

    return (
            <Container>
                <form onSubmit={handleSubmit}>
                    <VStack spacing="24px">
                        <HStack spacing="24px">
                            <FormControl id="first-name" isRequired>
                                <VisuallyHidden>
                                    <FormLabel>id</FormLabel>
                                    <Input placeholder="id" name="id" value={location.state.id} />
                                </VisuallyHidden>
                            </FormControl>

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
                        <Button
                        colorScheme="green"
                        size="lg"
                        type="submit"
                        >
                            Update Item
                        </Button>
                    </VStack>
                </form>
            </Container>

    );
}

export default UpdateForm;