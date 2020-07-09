import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    headers:{
        'User-Agent': 'GameHunt (Group Project)'
    }
});

