import Axios from 'axios'
import {AUTH_SERVICE , CHAT_SERVICE} from './urls'
const authAxios = Axios.create({
    baseURL: AUTH_SERVICE
    // baseURL:'/'
})

const chatAxios = Axios.create({
    baseURL: CHAT_SERVICE
    // baseURL:'/'
})

export {authAxios, chatAxios}