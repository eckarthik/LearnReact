import axios from 'axios';

const instance = axios.create({
    baseURL: "https://reactburgerbuilderapp-3796e.firebaseio.com/"
});

export default instance;