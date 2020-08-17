import express from 'express'
import { getAssociatesByBatchId } from './remote/caliber-api/get-associates-by-batch-id'
import { associateRouter } from './routers/associate-router';
import { batchRouter } from './routers/batch-router';

const app = express()

app.use(express.json())

// app.get('/', async ()=>{
//     let apiData = await getAssociatesByBatchId("TR-1077")
//     console.log(apiData)
// })

app.use('/associates', associateRouter);
console.log("HELLOOOOO we hit the associate router")
app.use('/batch', batchRouter);

app.listen(2006, () =>{
    console.log('Server has started!')
} )

