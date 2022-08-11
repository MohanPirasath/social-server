 

import  jwt  from "jsonwebtoken";

const auth = async (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token,process.env.SC)

            req.userId = decodedData?.indexOf;

        }else{
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub;
        }
        next()

    }catch(error){
        console.log(error,"middleware auth")
    }
}

export default auth




