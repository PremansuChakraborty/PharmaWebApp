import jwt from 'jsonwebtoken'

export const tokenVerification=(req,res,next)=>{
    try{
        const token=req.cookies.auth;
        if(!token) return res.status(401).send('No token existed')
        const decode=jwt.verify(token,process.env.SECRET_KEY)
        req.user=decode
        next()
    }catch(err){
        res.status(402).send('Invaild Token')
    }
}