 const AsyncHandler = (asyncFunction) => async(req,res,next)=>{
     try {
       await asyncFunction(req,res,next); 
     } catch (error) {
        next(error)
     }
}

export default AsyncHandler;