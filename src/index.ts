import express from 'express'
import { getAssociatesByBatchId } from './remote/caliber-api/get-associates-by-batch-id'

const app = express()

app.use(express.json())

app.get('/', async ()=>{
    let apiData = await getAssociatesByBatchId("TR-1077")
    console.log(apiData)
})

app.listen(2006, () =>{
    console.log('Server has started!')
} )

