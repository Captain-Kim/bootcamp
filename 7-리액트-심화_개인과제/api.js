import axios from "axios";

export const jsonApi = axios.create({
    baseURL: 'https://living-lily-gold.glitch.me',
    timeOUT: 5000,
    headers: {'Content-Type': 'application/json'}
})