export const chackAccess =(accessUser)=>(req,res,next)=>{
const role = req.user
console.log(role)
console.log("accessuser", accessUser)
next()
}