import express from 'express'
import { associateRouter } from './routers/associate-router';
import { corsFilter } from './middleware/cors-filter';
// import { batchRouter } from './routers/batch-router';

const app = express()

app.use(express.json())

app.use(corsFilter)


// app.use('/batches', batchRouter);
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

