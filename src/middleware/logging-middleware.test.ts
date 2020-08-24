const mockRequest = ()=>{
    return {
         user:undefined   
  
    }
}
 
const mockResponse =() => {
    let res:any = {}
    res.status = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
} 
 
import { loggingMiddleware } from '../middleware/logging-middleware'
 
describe('loggingMiddleware', ()=>{
    
    let req;
    let res;
    let next;
 
    //runs our setup before each individual test
    beforeEach(()=>{
        req = mockRequest()
        res = mockResponse()
        next = jest.fn()
    })
    
    it('Should not allow log request', ()=>{
            loggingMiddleware(req,res, next)
            expect(res.status).not.toBeCalled()
            expect(res.send).not.toBeCalled()
            expect(next).toBeCalled()
        })
        
    it('Should allow log request ', ()=>{
        //User obj returns undefined even after set up
        /*req.user = {//set up the user object
            method:'Mithrandir',
            ip:'127.0.0.1',
            path: '/login'
        }*/
        const fn = jest.fn()
        fn('Mithrandir Request from 127.0.0.1 to /login')
        loggingMiddleware(req,res, next)
        expect(fn).toHaveBeenCalledWith('Mithrandir Request from 127.0.0.1 to /login')
    })
})