import axios from 'axios'

//an optional env for host address or localhost default
//this is the caliber IP (?)
let baseURL = 'http://34.82.182.44' || 'http://localhost:2006'

export const caliberBaseClient = axios.create({
    baseURL,
    headers:{
        'Content-Type': 'application/json',
    //     'Referer' : 'website.js-army.com'
    },
})
