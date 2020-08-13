import axios from 'axios'

//an optional env for host address or localhost default
let baseURL = 'http://34.82.182.44'

export const caliberBaseClient = axios.create({
    baseURL
    // headers:{
    //     'Content-Type': 'application/json',
    //     'Referer' : 'website.js-army.com'
    // },
})
