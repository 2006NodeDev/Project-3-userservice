import express from 'express'

const app = express()

app.use(express.json())

app.listen(2006, () =>{
    console.log('Server has started!')
} )