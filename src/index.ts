import express from 'express'
import { associateRouter } from './routers/associate-router';
import { batchRouter } from './routers/batch-router';
import { corsFilter } from './middleware/cors-filter';

const app = express()

app.use(express.json())

app.use(corsFilter)

// app.get('/', async ()=>{
//     let apiData = await getAssociatesByBatchId("TR-1077")
//     console.log(apiData)
// })
app.use('/batches', batchRouter);
app.use('/associates', associateRouter);

// app.use((err, req, res, next) => {
//     if (err.statusCode){
//         res.status(err.statusCode).send(err.message)
//     }else{
//         console.log(err)
//         res.status(500).send('Something Went Wrong')

//     }
// })

app.listen(2006, () =>{
    console.log('Server has started!')
} )

