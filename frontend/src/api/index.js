import axios from "axios";

const baseUrl = "http://localhost:8080"



export default {
    getItems: function() {
        return axios.get(`${baseUrl}/list`);
    },
    getItemById: function(id) {
        return axios.get(`${baseUrl}/list/${id}`);
    },
    createNewItem: function(item) {
        return axios.post(`${baseUrl}/list`, item);
    },
    updateItem: function(id, item) {
        return axios.put(`${baseUrl}/list/${id}`, item);
    },
    deleteItem: function(id) {
        return axios.delete(`${baseUrl}/list/${id}`);
    }


}