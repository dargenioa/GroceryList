import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import Item from "./components/Item";
import Form from "./components/Form";
import UpdateForm from "./components/UpdateForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path="/">
          <Item /> 
          </Route>
          <Route exact path="/newItem">
          <Form /> 
          </Route>
          <Route exact path="/updateItem">
          <UpdateForm /> 
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>

  );
}

export default App;
