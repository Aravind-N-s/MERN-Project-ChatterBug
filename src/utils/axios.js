import Axios from 'axios'
import {AUTH_SERVICES , CHAT_SERVICES} from './urls'
const authAxios = Axios.create({
    baseURL: AUTH_SERVICES
    // baseURL:'/'
})

const chatAxios = Axios.create({
    baseURL: CHAT_SERVICES
    // baseURL:'/'
})

export {authAxios, chatAxios}