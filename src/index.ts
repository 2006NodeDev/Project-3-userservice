import express from 'express'
import { associateRouter } from './routers/associate-router';
//import { batchRouter } from './routers/batch-router';
import { corsFilter } from './middleware/cors-filter';

const app = express()

app.use(express.json())
app.use(corsFilter)

//app.use('/batches', batchRouter);
app.use('/associates', associateRouter);

app.listen(2006, () =>{
    console.log('Server has started!')
} )

